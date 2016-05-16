/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 /*#*SCRIPTR_PLUGIN*#*{"metadata":{"name":"simpleStateMachine","plugindata":{"cells":[{"type":"fsa.StartState","size":{"width":20,"height":20},"position":{"x":50,"y":50},"angle":0,"id":"bdf02498-40bb-45c6-9a3f-bd9d92815b31","z":1,"attrs":{"circle":{"fill":"#ff8c00","stroke":"#d87702","stroke-width":3},"text":{"text":"start"},".element-process":{"fill":"#fff"}}},{"type":"tm.Process","size":{"width":60,"height":60},"position":{"x":147,"y":158},"angle":0,"id":"f9bb1105-cb46-4919-93da-dd902a6d5ed9","z":2,"attrs":{".element-process":{"fill":"#fff"},"text":{"font-weight":"bold","font-size":16,"fill":"#555","text":"new_1","font-variant":"small-caps","text-transform":"capitalize"}}},{"type":"tm.Process","size":{"width":60,"height":60},"position":{"x":340,"y":72},"angle":0,"id":"156eea8a-71b9-4032-bcf4-888fa73b9f54","z":4,"attrs":{".element-process":{"fill":"#fff"},"text":{"font-weight":"bold","font-size":16,"fill":"#555","text":"new_3","font-variant":"small-caps","text-transform":"capitalize"}}},{"type":"link","source":{"id":"f9bb1105-cb46-4919-93da-dd902a6d5ed9"},"target":{"id":"156eea8a-71b9-4032-bcf4-888fa73b9f54"},"connector":{"name":"smooth"},"labels":[{"position":0.5,"attrs":{"text":{"text":"event_1","font-weight":"bold"}}}],"id":"cac49598-4c67-4d96-9558-077d20fa3cc9","z":6,"attrs":{".marker-source":{"d":"M 10 0 L 0 5 L 10 10 z"}}},{"type":"link","source":{"id":"bdf02498-40bb-45c6-9a3f-bd9d92815b31"},"target":{"id":"f9bb1105-cb46-4919-93da-dd902a6d5ed9"},"connector":{"name":"smooth"},"labels":[{"position":0.5,"attrs":{"text":{"text":"event_3","font-weight":"bold"}}}],"id":"74d4585b-849e-4e90-a379-5808d38b6fed","z":8,"attrs":{".connection":{"stroke":"#353535"},".marker-target":{"fill":"#353535","d":"M 10 0 L 0 5 L 10 10 z"}}}]},"scriptrdata":"\n//\n// Define Finite State Machine framework\n//\nfunction SimpleStateMachine(machineName, id) {\n\tif(machineName)\n\t\tthis.storage = this.loadStorage(id);\n\t// constructor\n\tconsole.debug(\"SM constructor for [\" + machineName + \"]\");\n}\nSimpleStateMachine.prototype.getId = function (){\n\treturn this.storage.id;\n}\n\nSimpleStateMachine.prototype.generateId = function(length){\n   \tvar random = \"\";\t\n   \tvar source = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\";\n\tvar numberOfCharacters = source.length;\n   \tfor( var i=0; i < length; i++ )\n       \trandom += source.charAt(Math.floor(Math.random() * 100 % numberOfCharacters));\n   \treturn random;\n}\n\nSimpleStateMachine.prototype.inspect = function () {\n\treturn JSON.stringify(this.storage);\n}\t\t\t\t\t\t\nSimpleStateMachine.prototype.event = function (name) {\n\tvar state = this.transitions[this.storage.state]\n\tvar transition = state[name];\n\tif(transition){\n      \tconsole.log(\"found transition\");\n\t\tvar branch = transition[\"branch\"];\n      \tvar code = transition[\"code\"];\n       \tif(code && branch){\n\t\t\tconsole.debug('attempting transition: ' + \n\t\t\t\tthis.storage.state + ' -> ' + name)              \n        \tif(code.call(this)){\n            \t//  If transition succeeds\n            \tconsole.debug('successfully set state set to: ' + name)\n                // change state\n                this.storage.state = branch\n\t\t\t\t//fields should have been updated by the user directly\n                this.persistStorage(this.storage.id)\n\t\t\t}else{\n\t\t\t\tconsole.debug(\"transition failed by user code\");\n            }\n\t\t} else {\n\t\t\tconsole.debug('transition failed, state: ' + this.storage.state)\n\t\t} \n\t} else {\n\t\tconsole.debug(\"transition '\" + name + \"' doesn't exist!\")\n\t}\n}\t\t\t\t\t\t\n\nSimpleStateMachine.prototype.loadStorage = function (id, storageModel) {\n\tconsole.debug(\"loading storage for [\" + id + \"]\")\n\t//based on the model copy from local storage or from GetDocument\n\tif(!id){\n    \t//generate new random id\n        id = this.generateId(10);\n        storage.global[id] = {};\n        storage.global[id].state = \"start\";\n        storage.global[id].fields = \"\"; //will not be persisted if it remains empty\n    }\n  \t\n  \tvar fields = null;\n  \tif(storage.global[id][\"fields\"]){\n\t\tfields = JSON.parse(storage.global[id][\"fields\"]);\n    }else{\n      \tfields = {};\n    }\t\n  \t//instance storage\n\tthis.storage = {\n\t\t// mandatory fields \n\t\tid: id,\n\t\tstate: storage.global[id].state,\n\t\tfields: fields\n\t}\n    return this.storage;\n}\nSimpleStateMachine.prototype.persistStorage = function (id) {\n  \tconsole.debug(\"persisting changes\")\n   \t//based on the model copy to local storage or call SaveDocument\n  \tstorage.global[id] = {};\n  \tstorage.global[id] = {\n      state: this.storage.state,\n      fields: JSON.stringify(this.storage.fields)\n    }\n}\n// Publishing StateMachine constructor\nvar StateMachineImpl = function(id) {\n\t// Call ancestor constructor\n  \tSimpleStateMachine.call (this, \"default\", id)\n}\n\nStateMachineImpl.prototype = new SimpleStateMachine()\nStateMachineImpl.prototype.constructor = StateMachineImpl\n// Define states and transitions\nStateMachineImpl.prototype.transitions = {\n\t\"start\" : {\n\t\t\t\"event_3\" : {\n\t\t\t\t\t\"code\": function() {return true;},\n\t\t\t\t\t\"branch\": \"new_1\"\n\t\t\t\t\t\n\t\t\t}\n\t\t},\n\t\"new_1\" : {\n\t\t\t\"event_1\" : {\n\t\t\t\t\t\"code\": function() {return true;},\n\t\t\t\t\t\"branch\": \"new_3\"\n\t\t\t\t\t\n\t\t\t}\n\t\t},\n\t\"new_3\" : {\n\t\t}\n}\n//get the required event\nvar event = request.parameters.event;\n\nvar id = request.parameters.id; //could be null, this will be handled by the SimpleStateMachine code\nconsole.log(id);\n//replace publishing by the current script name. \nvar ssmi = new StateMachineImpl(id);\nconsole.log(\"log: \" + ssmi.getId());\nif(event){\n  ssmi.event(event);\n}\nreturn ssmi.inspect();\n"}}*#*#*/

//
// Define Finite State Machine framework
//
function SimpleStateMachine(machineName, id) {
	if(machineName)
		this.storage = this.loadStorage(id);
	// constructor
	console.debug("SM constructor for [" + machineName + "]");
}
SimpleStateMachine.prototype.getId = function (){
	return this.storage.id;
}

SimpleStateMachine.prototype.generateId = function(length){
   	var random = "";	
   	var source = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var numberOfCharacters = source.length;
   	for( var i=0; i < length; i++ )
       	random += source.charAt(Math.floor(Math.random() * 100 % numberOfCharacters));
   	return random;
}

SimpleStateMachine.prototype.inspect = function () {
	return JSON.stringify(this.storage);
}						
SimpleStateMachine.prototype.event = function (name) {
	var state = this.transitions[this.storage.state]
	var transition = state[name];
	if(transition){
      	console.log("found transition");
		var branch = transition["branch"];
      	var code = transition["code"];
       	if(code && branch){
			console.debug('attempting transition: ' + 
				this.storage.state + ' -> ' + name)              
        	if(code.call(this)){
            	//  If transition succeeds
            	console.debug('successfully set state set to: ' + name)
                // change state
                this.storage.state = branch
				//fields should have been updated by the user directly
                this.persistStorage(this.storage.id)
			}else{
				console.debug("transition failed by user code");
            }
		} else {
			console.debug('transition failed, state: ' + this.storage.state)
		} 
	} else {
		console.debug("transition '" + name + "' doesn't exist!")
	}
}						

SimpleStateMachine.prototype.loadStorage = function (id, storageModel) {
	console.debug("loading storage for [" + id + "]")
	//based on the model copy from local storage or from GetDocument
	if(!id){
    	//generate new random id
        id = this.generateId(10);
        storage.global[id] = {};
        storage.global[id].state = "start";
        storage.global[id].fields = ""; //will not be persisted if it remains empty
    }
  	
  	var fields = null;
  	if(storage.global[id]["fields"]){
		fields = JSON.parse(storage.global[id]["fields"]);
    }else{
      	fields = {};
    }	
  	//instance storage
	this.storage = {
		// mandatory fields 
		id: id,
		state: storage.global[id].state,
		fields: fields
	}
    return this.storage;
}
SimpleStateMachine.prototype.persistStorage = function (id) {
  	console.debug("persisting changes")
   	//based on the model copy to local storage or call SaveDocument
  	storage.global[id] = {};
  	storage.global[id] = {
      state: this.storage.state,
      fields: JSON.stringify(this.storage.fields)
    }
}
// Publishing StateMachine constructor
var StateMachineImpl = function(id) {
	// Call ancestor constructor
  	SimpleStateMachine.call (this, "default", id)
}

StateMachineImpl.prototype = new SimpleStateMachine()
StateMachineImpl.prototype.constructor = StateMachineImpl
// Define states and transitions
StateMachineImpl.prototype.transitions = {
	"start" : {
			"event_3" : {
					"code": function() {return true;},
					"branch": "new_1"
					
			}
		},
	"new_1" : {
			"event_1" : {
					"code": function() {return true;},
					"branch": "new_3"
					
			}
		},
	"new_3" : {
		}
}
//get the required event
var event = request.parameters.event;

var id = request.parameters.id; //could be null, this will be handled by the SimpleStateMachine code
console.log(id);
//replace publishing by the current script name. 
var ssmi = new StateMachineImpl(id);
console.log("log: " + ssmi.getId());
if(event){
  ssmi.event(event);
}
return ssmi.inspect();
			