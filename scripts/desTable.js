/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 /*#*SCRIPTR_PLUGIN*#*{"metadata":{"name":"SimpleDecisionTable","plugindata":{"columns":[{"field":"recid","caption":"Rec. Id","size":"100%","resizable":true,"hidden":true,"noDrag":true},{"field":"rowtype","caption":"Type","size":"100%","hidden":true,"noDrag":true},{"field":"name","caption":"","size":"100%","noDrag":true,"editable":{"type":"text"},"sizeType":"%","sizeCalculated":"201px","min":120,"sizeCorrected":"20%"},{"field":"fieldType","caption":"Type","size":"100%","noDrag":true,"editable":{"type":"select","items":["number","string","boolean","date","function"]},"sizeType":"%","sizeCalculated":"201px","min":120,"sizeCorrected":"20%"},{"field":"rule1","caption":"Rule 1","size":"100%","editable":{"type":"myType","inTag":"","outTag":"","style":"","items":[],"selected":""},"sizeType":"%","sizeCalculated":"201px","min":120,"sizeCorrected":"20%"},{"field":"rule2","caption":"Rule 2","size":"100%","editable":{"type":"myType","inTag":"","outTag":"","style":"","items":[],"selected":"true"},"sizeType":"%","sizeCalculated":"201px","min":120,"sizeCorrected":"20%"},{"field":"rule3","caption":"Rule 3","size":"100%","editable":{"type":"myType","inTag":"","outTag":"","style":"","items":[],"selected":""},"sizeType":"%","sizeCalculated":"201px","min":120,"sizeCorrected":"20%"}],"records":[{"recid":0,"name":"condition_1","rowtype":"condition","fieldType":"string"},{"recid":1,"name":"condition_2","rowtype":"condition","fieldType":"number"},{"recid":2,"name":"action_1","rowtype":"action","fieldType":"string","attr":"action='true'"},{"recid":3,"name":"action_2","rowtype":"action","fieldType":"string","attr":"action='true'"}],"prescript":"","postscript":"//Variable \"decision\" is the object returned by the decision table execution.\n//Variable \"decision\" format is [{\"action1\": \"value1\", \"action2\":  \"value2\"}].\nreturn decision;","exclusive":true},"scriptrdata":"//Get payload parameters\nvar pl = null;\nvar requestBody = request.body;\nif (!requestBody) {\n\tpl = request.parameters.payload;\n\tpl = JSON.parse(pl);\n} else {\n\tpl = requestBody.payload;\n}\n\n//START TABLE DECISION CODE\nfunction execute(pl) {\n\nvar decision = [];\n\n//PRESCRIPT START\n\n//PRESCRIPT END\n\n//RULES EVALUATION START\nif(typeof pl != \"object\") {\n  return[];\n} else { \n\t  if(isAny(\"condition_1\") && isAny(\"condition_2\")){\n       decision.push({  });\n\t} \n\t else if(isAny(\"condition_1\") && isAny(\"condition_2\")){\n       decision.push({  });\n\t} \n\t else if(isAny(\"condition_1\") && isAny(\"condition_2\")){\n       decision.push({  });\n\t} \n}\n//RULES EVALUATION END\n\n//POSTSCRIPT START\n//Variable \"decision\" is the object returned by the decision table execution.\n//Variable \"decision\" format is [{\"action1\": \"value1\", \"action2\":  \"value2\"}].\nreturn decision;\n//POSTSCRIPT END\n\n}\n//Check if value is \"in\" or is \"not in\" array\n//return true or false\nfunction evalArrayOperation(value, operator,  array) {\n\tif(operator == \"in\") {\n\t\treturn (array.indexOf(value)>-1);\n\t} else {\n\t\treturn (array.indexOf(value) == -1) ;\n\t} \n}\n\n//isAny function, when condition expression is not important\nfunction isAny(param) {\n\treturn true;\n}\n\n//START_REST_CALL \nreturn execute(pl);\n//END_REST_CALL"}}*#*#*/
//Get payload parameters
var pl = null;
var requestBody = request.body;
if (!requestBody) {
	pl = request.parameters.payload;
	pl = JSON.parse(pl);
} else {
	pl = requestBody.payload;
}

//START TABLE DECISION CODE
function execute(pl) {

var decision = [];

//PRESCRIPT START

//PRESCRIPT END

//RULES EVALUATION START
if(typeof pl != "object") {
  return[];
} else { 
	  if(isAny("condition_1") && isAny("condition_2")){
       decision.push({  });
	} 
	 else if(isAny("condition_1") && isAny("condition_2")){
       decision.push({  });
	} 
	 else if(isAny("condition_1") && isAny("condition_2")){
       decision.push({  });
	} 
}
//RULES EVALUATION END

//POSTSCRIPT START
//Variable "decision" is the object returned by the decision table execution.
//Variable "decision" format is [{"action1": "value1", "action2":  "value2"}].
return decision;
//POSTSCRIPT END

}
//Check if value is "in" or is "not in" array
//return true or false
function evalArrayOperation(value, operator,  array) {
	if(operator == "in") {
		return (array.indexOf(value)>-1);
	} else {
		return (array.indexOf(value) == -1) ;
	} 
}

//isAny function, when condition expression is not important
function isAny(param) {
	return true;
}

//START_REST_CALL 
return execute(pl);
//END_REST_CALL			