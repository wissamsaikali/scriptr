/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
 
 var airqualityFactoryModule = require("generic/airqualitysensors/factory");
var airqualityFactory = new airqualityFactoryModule.Factory();

try {
  
  var deviceId = request.parameters.id;
  var simulate = request.parameters.simulate ? true : false;
  if(!deviceId) {

    return {

      errorCode: "Missing_Parameter",
      errorDetail: "id parameter is missing"
    };
  }

  var virtual = {

    providerId: "virtual",
    deviceId: deviceId,
    locationId: "anyvalue",
    username: "testuser"
  };

    var virtualAirQualitySensor = airqualityFactory.getProvider(virtual);
    return virtualAirQualitySensor.getData(simulate);
}catch(exception) {
  return exception;
}			