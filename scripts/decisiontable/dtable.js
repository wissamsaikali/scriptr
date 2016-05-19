/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 /**
 * Simple implementation of a decision table.
 * @class DecisionTable
 * @constructor
 * @param {Object} [table]
 * @param {Object} [table.rules] the rules to be verified (i.e. properties with associated conditions)
 * @param {Object} [table.actions] the actions to trigger depending on the verified rules
 * The rules object has to adopt the following structure 
 * {
 * 	 rule1-name : [condition1, condition2, ...],
 *	 rule2-name : [condition3, condition4, ...],
 *   ...
 * }
 * The actions object has to adopt the following structure
 * {
 *	 action1: [true/false, true/false, ...],
 *	 action2: [true/false, true/false, ...],
 *	 ..
 * }
 * action array values should be set to true if the action has to be taken, false otherwise
 * rules conditions can be: 
 * - number comparison, e.g: "==40", "<50", ">=30", "!=5"
 * - string equality, e.g. "=='abc'" (pay attention to the '' inside the "")
 * - boolean, e.g. true, false
 * - inclusion, exclusion, e.g. : "in['a','b','c']", "!in[1,3,7]"
 * - variable comparison, e.g. "==x", ">x", etc. where 'x' is a variable in scope
 * - use "any" whenever the value is not relevant
 * IMPORTANT:
 * rules arrays must have the same length
 * actions arrays must have the same length and same length as the rules array
 * HOW IT WORKS: invoke the analyze() method, passing values for every rule.
 * Set of rules are evaluated per column (i.e rule1[0] && rule2[0] && ... rulen[0])
 * When the rules of a column are verified, the actions of the same column are returned
 * EXAMPLE
 * table = {
 *   rules : {
 *     "credit": ["=='good'", "=='good'", "=='bad'", "=='bad'", "=='bad'"],
 *     "star-client": ["any", "any", true, true, false],
 *     "stock": ["=='suf'", "=='insuf'", "=='suf'", "=='insuf'", "any"]
 *   },
 *	actions: {
 *     "accept": [true, false, true, false, false],
 *     "wait": [false, true, false, true, false],
 *     "reject": [false, false, false, false, true]
 *   }
 * };
 * In this table:
 * - If credit is "good" and "star-client" is either true or false and stock is "suf"
 * then action is "accept". 
 * - If cedit is "good" and start-client is either true or false and stock is "insuf"
 * then action is "wait"
 */
function DecisionTable(table) {  
  
  if (!table) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "table should be defined"
    };
  }
  
  if (!table.rules) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "table.rules should be defined"
    };
  }
  
  if (!table.actions) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "table.actions should be defined"
    };
  }
  
  if (!this._hasEvenLength(table.rules)) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "table.rules does not have rows with same length"
    };
  }
  
  if (!this._hasEvenLength(table.actions)) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "table.actions does not have rows with same length"
    };
  }
  
  this.table = table;
}

/**  
 * Use this method to obtain the actions to execute according to a set of values
 * depending on the current decision table
 * @method analyze
 * @param {Object} sample : the sample to analyse based on the table
 * The sample has to be the following structure:
 * { rule1: value1, rule2:value2, ..., rulen:valuen}
 * @return {Array} and array of {String} actions
 * EXAMPLE: based on the table given in the example in the constructor, the following
 * are examples of possible invocations:
 * - analyze({"credit":"good", "star-client": true,  "stock":"suf"}) --> returns ["accept"]
 * - analyze({"credit":"good", "star-client": true,  "stock":"insuf"}) --> returns ["wait"])
 * - analyze({"credit":"bad", "star-client": true,  "stock":"suf"}) --> returns ["accept"])
 * etc.
 */
DecisionTable.prototype.analyze = function(sample) {
  
  this._toExpectedStringFormat(sample);  
  var applicable = false;
  var length = this.table.rules[Object.keys(this.table.rules)[0]].length;
  var index  = -1;
  for (var i = 0; i < length && !applicable; i++) { 
    
    index = i;
    applicable = true;
    for (var ruleName in this.table.rules) {
     
      var rule = this.table.rules[ruleName];
	  applicable = applicable && this._evaluate(sample[ruleName], rule[i]);      
    }
    
    if (applicable) {
      return this._getActions(index);
    }
  }
  
  return [];
};

/*
 * Evaluates a rule cell according to the given sample value
 * @method _evaluate
 * @param sampleValue : the value to evaluate against the rule
 * @param rule: the rule to use for the evaluation
 * @return {Boolean}
 */
DecisionTable.prototype._evaluate = function(sampleValue, rule) {
  
  if (rule == "any") {
    return true;
  }
  
  if (typeof rule == "boolean") {    
    return sampleValue == rule;
  }
  
  if (rule.indexOf("in[") > -1) {
    
    var arrayStr = rule.substring(2);
    return arrayStr.indexOf(sampleValue) > -1;
  }
  
  if (rule.indexOf("!in[") > -1) {
    
    var arrayStr = rule.substring(2);
    return arrayStr.indexOf(sampleValue) == -1;
  }
 
  return eval(sampleValue +  rule);
};

/*
 * Returns all the actions that pertain to a given rule column (index)
 * @method _getActions
 * @param {Number} index:  the index of the column
 * @return {Array} and array of {String}
 */
DecisionTable.prototype._getActions = function(index) {

  var actions = [];
  for (var actionName in this.table.actions) {
   
  	if (this.table.actions[actionName][index]) {      
      actions.push(actionName);
    }
  }
  
  return actions;
};

/*
 * Checks if the rows of a given section (rules or actions) all have the same length
 * @method _hasEvenLength
 * @param {Object} section : table.rules or table.actions
 * @return {Boolean} 
 */
DecisionTable.prototype._hasEvenLength = function(section) {
 
  var lengthIsEven = true;
  var len = 0;
  var keys = Object.keys(section);
  var condition = true;
  for (var i = 0; lengthIsEven && i < keys.length; i++) {
    
    var currentLength = section[keys[i]].length;
    if (len) {
      lengthIsEven = currentLength == len
    }
   
    len = currentLength;
  }
  
  return lengthIsEven;
};

/*
 * Wraps sample strings with ''
 * @method _toExpectedStringFormat
 * @param {Object} sample : the sample passed to the decision table
 * @return {Object} the modified sample 
 */
DecisionTable.prototype._toExpectedStringFormat = function(sample) {
  
  for (var key in sample) {
    if (typeof sample[key] == "string") {
      sample[key] = "'" + sample[key] + "'";
    }
  }
};			