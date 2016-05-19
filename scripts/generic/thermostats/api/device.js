/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
 var thermFactoryModule = require("generic/thermostats/factory");
var thermFactory = new thermFactoryModule.Factory();

var deviceId = request.parameters.id;
if(!deviceId) {
  return {
    errorCode: "Missing_Parameter",
    errorDetail: "deviceId is missing"
  }
}

var virtual = {
  
  providerId: "virtual",
  deviceId: deviceId,
  locationId: "anyvalue",
  username: "testuser"
};

var virtualThermostat = thermFactory.getProvider(virtual);
return virtualThermostat.getData();			