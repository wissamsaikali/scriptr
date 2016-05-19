/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
 var thermFactoryModule = require("generic/thermostats/factory");
var thermFactory = new thermFactoryModule.Factory();

var provider = request.parameters.provider;
var deviceId = request.parameters.deviceId;
var structureId = request.parameters.structureId;
var username = request.parameters.username;
var temperature = request.parameters.temperature;

if(!provider || !deviceId ||  !structureId || !username) {
  return {
    errorCode: "Missing_Parameter",
    errorDetail: "You need to send the following parameters: provider, deviceId, structuredId and username"
  }
}

var params = {
  
  providerId: provider,
  deviceId: deviceId,
  locationId: structureId,
  username: username
};

try {

  var data = {};
  var thermostat = thermFactory.getProvider(params);
  if (request.parameters.targetTemperature) {
  	thermostat.setTargetTemperature({temperature:request.parameters.targetTemperature});  
  }
  
  if (request.parameters.temperature) {
  	thermostat.setTemperature({temperature:request.parameters.temperature});  
  }
  
  if (request.parameters.mode) {
    thermostat.setMode({mode: request.parameters.mode});
  }
  
  if (request.parameters.fanMode) {
    thermostat.setFanMode({mode: request.parameters.fanMode});
  }
  
  if (request.parameters.online) {
    thermostat.setOnline({online: request.parameters.online});
  }
  
  return thermostat.getData();
}catch(exception) {
  return exception;
}			