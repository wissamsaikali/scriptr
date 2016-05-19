/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
 
 var airqualityFactoryModule = require("generic/airqualitysensors/factory");
var airqualityFactory = new airqualityFactoryModule.Factory();

var values = request.parameters ? request.parameters : (request.body ? request.body : null);

if(!values) {
  
  return {
    errorCode: "Missing_Parameter",
    errorDetail: "You need to send the following parameters: provider, deviceId, structuredId and username"
  }
}

var provider = values.provider;
var deviceId = values.deviceId;
var structureId = values.structureId;
var username = values.username;
var temperature = values.temperature;

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
  var virtualAirSensor = airqualityFactory.getProvider(params); 
  if (values.measures) {
  	virtualAirSensor.setMeasures({measures:JSON.parse(values.measures)});  
  }
  
  return virtualAirSensor.getData();
}catch(exception) { 
  return exception;
}			