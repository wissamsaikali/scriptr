/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var thermostatModule = require("generic/thermostats/thermostat");

function NestThermostatAdapter(dto) {
  
  if (!dto || !dto.id || !dto.client) {
    
    throw {
      errorCode: "Invalid_Parameter",
      errorDetail: "NestThermostatAdapter. dto.id and dto.client should be defined"
    };
  }
  
  thermostatModule.Thermostat.call(this, dto);
}

NestThermostatAdapter.prototype = new thermostatModule.Thermostat();
NestThermostatAdapter.prototype.constructor = NestThermostatAdapter;

NestThermostatAdapter.prototype.getData = function() {
  
  var data = this.client.getThermostat(this.id);
  var normalized = {
    
    deviceId: data.device_id,
    name: data.name,
    online: data.is_online,
    structureId: data.structure_id,
    temperature: data.ambient_temperature_f,
    humidity: data.humidity,
    mode: data.hvac_mode,
    targetTemperature: data.target_temperature_f,
    fanMode: "none"
  }
  
  return normalized;
};

NestThermostatAdapter.prototype.setTargetTemperature = function(dto) {
  
  if (!dto || !dto.temperature) {
    
    throw {
      errorCode: "Invalid_Parameter",
      errorDetail: "NestThermostatAdapter.setTargetTemperature dto.temperature should be defined"
    };
  }
  
  return this.client.setTargetTemperature(this.id, dto.temperature, "f");
};

NestThermostatAdapter.prototype.setMode = function(dto) {
   
  if (!dto || !dto.mode) {
    
    throw {
      errorCode: "Invalid_Parameter",
      errorDetail: "NestThermostatAdapter.setMode dto.mode should be defined"
    };
  }
  
  switch(dto.mode) {
      
    case this.MODE.HEAT : this.client.switchToHeatMode(this.id);break;
    case this.MODE.COOL : this.client.switchToCoolMode(this.id);break;  
  }  
};			