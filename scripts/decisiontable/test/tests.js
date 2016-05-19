/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
 var tableModule = require("decisiontable/dtable");

try { 
  
  var results = {};
  
  /*
   * Tests 1 and 2 on decision table 1
   */
  var table1 = {
  rules : {
    "payment":      ["any", "<50", "any", "<50", ">50", [">50"]],
    "check":        [true, true,  false, false,  true, false],
    "credit card":  [true, false,  true, false,  false, false]
  }, 
    actions: {
      "ring up sale" :   [false, true, false, false, false, false],
      "check from DB":   [false, false, false, true, false, false],
      "call supervisor": [true, false, false, false, true, false],
      "check from CDB":  [false, false, true, true, false, false]
    }
  };
   
  var decisionTable1 = new tableModule.DecisionTable(table1);  
  
  var test1 = decisionTable1.analyze({payment:30, check:false, "credit card": true});
  results.test1 = test1;  
  var test2 = decisionTable1.analyze({payment:100, check:true, "credit card": false});
  results.test2 = test2;
  
   /*
    * Tests 3 and 4 on decision table 2
    */
  var table2 = {
    rules : {
      "employee type": ["=='S'", "=='H'", "=='S'", "=='H'", "=='S'", "=='H'"],
      "hours worked":  ["<40", "<40", "==40", "==40", ">40", ">40"]
    }, 
    actions: {
      "pay base salary" :        [true, false, true, false, true, false],
      "calculate hourly wage":   [false, true, false, true, false, true],
      "calculate overtime":      [false, false, false, false, false, true],
      "produce absence report":  [false, true, false, false, false, false]
    }
  };
  
  var decisionTable2 = new tableModule.DecisionTable(table2); 
  
  var test3 = decisionTable2.analyze({"employee type":"H", "hours worked":32});
  results.test3 = test3;  
  var test4 = decisionTable2.analyze({"employee type":"S", "hours worked":40});
  results.test4 = test4;
  
   /*
    * Tests 5 and 6 on decision table 3
    */
   var table3 = {
    rules : {
      "credit": ["=='good'", "=='good'", "=='bad'", "=='bad'", "=='bad'"],
      "star-client": ["any", "any", true, true, false],
      "stock": ["=='suf'", "=='insuf'", "=='suf'", "=='insuf'", "any"]
    },
	actions: {
      "accept": [true, false, true, false, false],
      "wait": [false, true, false, true, false],
      "reject": [false, false, false, false, true]
    }
  };
  
  var decisionTable3 = new tableModule.DecisionTable(table3); 
  
  var test5 = decisionTable3.analyze({"credit":"good", "star-client": true,  "stock":"insuf"});
  results.test5 = test5;  
  var test6 = decisionTable3.analyze({"credit":"bad", "star-client": false,  "stock":"any"});
  results.test6 = test6;
  
  /*
   * Tests 7, 8, 9, 10 on decision table 4
   */
  var table4 = {
    rules : {
      "role": ["in['manager','admin']", "in['manager','admin']", "=='developer'", "=='visitor'"],
      "credentials": ["=='token'", "=='certificate'", "in['token','certificate']", "in['token','certificate']"]
    },
	actions: {
      "read":   [true, true, true, true],
      "write":  [true, true, true, false],
      "delete": [false, true, false, false]
    }
  };
  
  var decisionTable4 = new tableModule.DecisionTable(table4); 
  
  var test7 = decisionTable4.analyze({"role":"admin", "credentials": "token"});
  results.test7 = test7;  
  var test8 = decisionTable4.analyze({"role":"admin", "credentials": "certificate"});
  results.test8 = test8;
  var test9 = decisionTable4.analyze({"role":"developer", "credentials": "certificate"});
  results.test9 = test9;
  var test10 = decisionTable4.analyze({"role":"developer", "credentials": "token"}); 
  results.test10 = test10;
  
  return results;
}catch(exception) {
  return exception;
}
			