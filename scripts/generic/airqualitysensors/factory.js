/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
 var basefactoryModule = require("generic/basefactory");

function Factory() {
}

Factory.prototype = new basefactoryModule.BaseFactory();
Factory.prototype.constructor = Factory;

Factory.prototype._virtual = function(dto) {
  
  var virtualModule = require("generic/airqualitysensors/virtual");
  var virtualDevice = new virtualModule.VirtualAirQualitySensorAdapter(dto);
  return virtualDevice;
};			