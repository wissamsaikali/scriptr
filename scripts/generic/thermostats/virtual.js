/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var thermostatModule = require("generic/thermostats/thermostat");

function VirtualThermostatAdapter(dto) {  
  
  if (!storage.global.generic) {
    storage.global.generic = {};
  }
  
  if (!storage.global.generic.virtual) {
    storage.global.generic.virtual = {};
  }
  
  this.id = dto.deviceId.toLowerCase() == "new" ? "" : dto.deviceId;  
  if (this.id){
    
    var properties = storage.global.generic.virtual[this.id];
    if (!properties) {
    
      return {
        
        errorCode: "Device_Not_Found",
      	errorDetail: "VitualThermostatAdapter. Could not find device " + this.id
      };
    }
    
    for (var property in properties) {    
      this[property] = properties[property];
    }
  }else {
   
    this.id = this._generateId("t_");
    this.name = dto.values && dto.values.name ?  dto.name : this._generateName();
    this.online =  dto.values && dto.values.online ? dto.values.online : true;
    this.structureId = dto.values && dto.values.structureId ?  dto.values.structureId : this._generateId("s_");
    this.temperature = dto.values && dto.values.temperature && dto.values.temperature != "0" ?  dto.values.temperature : Math.round(Math.random() * 50 + 30),
    this.humidity = dto.values && dto.values.humidity && dto.values.humidity != "0" ?  dto.values.humidity : Math.round(Math.random() * 20 + 20),
    this.mode = dto.values && dto.values.mode ? dto.values.mode : this.MODE.HEAT;
    this.targetTemperature = dto.values && dto.values.targetTemperature && dto.values.targetTemperature != "0" ? dto.values.targetTemperature : this.temperature;
    this.fanMode = dto.values && dto.values.fanMode ? dto.values.fanMode : this.FANMODES.FAN_OFF;
    this._persist();
  }
}

VirtualThermostatAdapter.prototype = new thermostatModule.Thermostat();
VirtualThermostatAdapter.prototype.constructor = VirtualThermostatAdapter;

VirtualThermostatAdapter.prototype.CHANNEL_NAME = "virtual_devices";

VirtualThermostatAdapter.prototype.getData = function() {
  
  return {
    
    "deviceId": this.id,
    "name": this.name,
    "online": this.online,
    "structureId": this.structureId,
    "temperature": this.temperature,
    "humidity": this.humidity,
    "mode": this.mode,
    "targetTemperature": this.targetTemperature,
    "fanMode": this.fanMode
  }
};

VirtualThermostatAdapter.prototype.setTemperature = function(dto) {
  
  if (!dto || !dto.temperature) {
    
    throw {
      errorCode: "Invalid_Parameter",
      errorDetail: "VitualThermostatAdapter.setTargetTemperature dto.temperature should be defined"
    }
  }
  
  this.temperature = this.temperature ? this.temperature : dto.temperature;
  this.targetTemperature = dto.temperature;
  this._persist();
  this._publishChange();
};

VirtualThermostatAdapter.prototype.setTargetTemperature = function(dto) {
  
  if (!dto || !dto.temperature) {
    
    throw {
      errorCode: "Invalid_Parameter",
      errorDetail: "VitualThermostatAdapter.setTargetTemperature dto.temperature should be defined"
    }
  }
  
  this.temperature = this.temperature ? this.temperature : dto.temperature;
  this.targetTemperature = dto.temperature;
  this._persist();
  this._publishChange();
};

VirtualThermostatAdapter.prototype.setMode = function(dto) {
   
  if (!dto || !dto.mode) {

    throw {
      errorCode: "Invalid_Parameter",
      errorDetail: "VitualThermostatAdapter.setMode dto.mode should be defined"
    };
  }
  
  if (!this._isPossibleValue(dto.mode, this.MODE)) {
    
    throw {
      errorCode: "Invalid_Parameter",
      errorDetail: "VitualThermostatAdapter.setMode : invalid mode " +  dto.mode
    };
  }
  
  this.mode = dto.mode;
  this._persist();
  this._publishChange();
};

VirtualThermostatAdapter.prototype.setFanMode = function(dto) {
   
  if (!dto || !dto.mode) {
    
    throw {
      errorCode: "Invalid_Parameter",
      errorDetail: "VitualThermostatAdapter.setFanMode dto.mode should be defined"
    };
  }
  
  if (!this._isPossibleValue(dto.mode, this.FANMODES)) { 
    
    throw {
      errorCode: "Invalid_Parameter",
      errorDetail: "VitualThermostatAdapter.setFanMode : invalid mode " +  dto.mode
    };
  }
  
  this.fanMode = dto.mode;
  this._persist();
  this._publishChange();
};

VirtualThermostatAdapter.prototype.setOnline = function(dto) {
  
   if (!dto || !dto.online) {
    
    throw {
      errorCode: "Invalid_Parameter",
      errorDetail: "VitualThermostatAdapter.setOnline dto.online should be defined"
    };
  }
  
  this.online = dto.online;
};

VirtualThermostatAdapter.prototype._generateName = function() {
  
  var choices = [
    "kids", "parents", "guests", "kitchen", "hall", "living", "salon", "dining", "office", "den", "basement",
    "garage", "corridor", "playroom" 
  ];
  
  var n = choices[Math.round(Math.random() * (choices.length - 1))];
  var index = Math.round(Math.random() * 1000 + 1);
  return ( n + "_" + index);
};

VirtualThermostatAdapter.prototype._isPossibleValue = function(value, obj) {
  
  var keys = Object.keys(obj);
  var found = false;
  for (var i = 0; i < keys.length && !found; i++) {
    found = obj[keys[i]] == value;
  } 
  
  return found;
};			