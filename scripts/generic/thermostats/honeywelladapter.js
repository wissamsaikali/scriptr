/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var thermostatModule = require("generic/thermostats/thermostat");
var mappings = require("honeywell/mappings");

function HoneywellThermostatAdapter(dto) {
  
  if (!dto || !dto.id || !dto.client) {
    
    throw {
      errorCode: "Invalid_Parameter",
      errorDetail: "HoneywellThermostatAdapter. dto.id and dto.client should be defined"
    };
  }
  
  thermostatModule.Thermostat.call(this, dto);
}

HoneywellThermostatAdapter.prototype = new thermostatModule.Thermostat();
HoneywellThermostatAdapter.prototype.constructor = HoneywellThermostatAdapter;

HoneywellThermostatAdapter.prototype.getData = function() {
  
  var data = this.client.getData({allData:true, include:{}});
  console.log(JSON.stringify(data))
  var normalized = {
    
    deviceId: data.deviceID,
    name: data.name,
    online: data.isAlive,
    structureId: data.locationID,
    temperature: data.thermostat.indoorTemperature,
    humidity: data.thermostat.indoorHumidity,
    mode: data.thermostat.changeableValues.mode,
    targetTemperature: data.thermostat.changeableValues.heatSetpoint.value
  }
  
  return normalized;
};

HoneywellThermostatAdapter.prototype.setTargetTemperature = function(dto) {
  
  if (!dto || !dto.temperature) {
    
    throw {
      errorCode: "Invalid_Parameter",
      errorDetail: "HoneywellThermostatAdapter.setTargetTemperature dto.temperature should be defined"
    };
  }
  
  var currentMode = this.client.getData({allData:true, include:{}});
  if (currentMode.thermostat.changeableValues.mode) {
    
    var setPoint = {
        
      value: dto.temperature, 
      status: mappings.status.thermostat.Temporary,
      nextTime: new Date().toISOString()
    };
    console.log(currentMode.thermostat.changeableValues.mode.toLocaleLowerCase());
    switch(currentMode.thermostat.changeableValues.mode.toLocaleLowerCase()) {
      
      case this.MODE.COOL : this.client.changeCoolingSetPoint(setPoint);break;        
      case this.MODE.HEAT : this.client.changeHeatingSetPoint(setPoint);break;
    }
  }else {
    
    throw {
      errorCode : "Invalid_State",
      errorDetail : "HoneywellThermostatAdapter.setTargetTemperature : Could not determine current mode (heart/cool?)"
    };
  }
};

HoneywellThermostatAdapter.prototype.setMode = function(dto) {
   
  if (!dto || !dto.mode) {
    
    throw {
      errorCode: "Invalid_Parameter",
      errorDetail: "HoneywellThermostatAdapter.setMode dto.mode should be defined"
    };
  }
  
  switch(dto.mode) {
    case this.MODE.HEAT : this.client.changeMode({mode: mappings.modes.thermostat.Heat});break;
    case this.MODE.COOL : this.client.changeMode({mode: mappings.modes.thermostat.Cool});break;  
  }  
};

HoneywellThermostatAdapter.prototype.setFanMode = function(dto) {
   
  if (!dto || !dto.mode) {
    
    throw {
      errorCode: "Invalid_Parameter",
      errorDetail: "HoneywellThermostatAdapter.setFanMode dto.mode should be defined"
    };
  }
      
  return this.client.changeFanMode({mode: mappings.modes["thermostat.fan"].On});
};			