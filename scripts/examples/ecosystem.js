/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var nestModule = require("nest/nestClient");
var cloudBits = require("littlebits/cloudBits");

var nest = new nestModule.NestClient(true);
var thermostat = nest.getThermostatByName("Kids Room");
if (thermostat.humidity <= 30) {
  cloudBits.write("humidifier", "HIGH");
}   							