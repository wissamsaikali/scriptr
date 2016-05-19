/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
 
 var airqualityFactoryModule = require("generic/airqualitysensors/factory");
var airqualityFactory = new airqualityFactoryModule.Factory();

var virtual = {
  
  providerId: "virtual",
  deviceId: "new",
  username: "testuser"
};

var values = request.parameters ? request.parameters : (request.body ? request.body : null);
if (values) {
  virtual.values = values;
}

var virtualAirSensor = airqualityFactory.getProvider(virtual);
return virtualAirSensor.getData();			