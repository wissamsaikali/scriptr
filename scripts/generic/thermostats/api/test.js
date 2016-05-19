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
  thermostat.setTargetTemperature({temperature:temperature});
  return thermostat.getData();
}catch(exception) {
  return exception;
}			