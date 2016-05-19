/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
 var clientModule = require("nest/nestClient");
var client = new clientModule.NestClient(false);
try {
  
  var execData = {};
  var thermostatData = client.getThermostatByName("Kids Room");
  execData.thermostatData = thermostatData;
  execData.atHome = client.setAtHome(thermostatData.structure_id);
  //execData.away = client.setAway(thermostatData.structure_id);
  //execData.targetTemp = client.setTargetTemperature(thermostatData.device_id, 66);
  return execData;
}catch(exception) {
  return exception;
}			