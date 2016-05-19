/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
 var thermFactoryModule = require("generic/thermostats/factory");
var thermFactory = new thermFactoryModule.Factory();

var virtual = {
  
  providerId: "virtual",
  deviceId: "new",
  locationId: "new",
  username: "karim@scriptr.io"
};

var values = request.parameters ? request.parameters : (request.body ? request.body : null);
if (values) {
  virtual.values = values;
}

var virtualThermostat = thermFactory.getProvider(virtual);
return virtualThermostat.getData();			