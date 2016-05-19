/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var thermFactoryModule = require("generic/thermostats/factory");
var thermFactory = new thermFactoryModule.Factory();
var honeywell = {
  
  providerId: "honeywell",
  deviceId: 35359,
  locationId: 1290,
  username: "tom@scriptr.io"
};

var nest = {
  
  providerId: "nest",
  deviceId: "A6dAEP1gLizQKLBd_M3Ml2Yp-ibWxUCQ",
  locationId: "C_bVq7HM42Z6pNnFUCOG6JriDvyLb8efBtPZ0jCFz7xe75jWSytHQA",
  username: "karim"
};

var virtual = {
  
  providerId: "virtual",
  deviceId: "t_k9eqvnhdvw",
  locationId: "s_xa76fhi30p",
  username: "karim@scriptr.io"
};

try {

  var data = {};
  
  var honeywellThermostat = thermFactory.getProvider(honeywell);
  data.honewellThemostataData = honeywellThermostat.getData();
  honeywellThermostat.setTargetTemperature({temperature:69});
  
  var nestThermostat = thermFactory.getProvider(nest);
  data.nestThermostatData = nestThermostat.getData();
  nestThermostat.setTargetTemperature({temperature:70});
  
  var virtualThermostat = thermFactory.getProvider(virtual);
  data.virtualThermostat = virtualThermostat.getData();
  virtualThermostat.setTargetTemperature({temperature:62});
  
  return data;
}catch(exception) {
  return exception;
}			