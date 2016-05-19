/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var basedeviceModule = require("generic/basedevice");

function Thermostat(dto) {
  
  if (dto) {
    basedeviceModule.BaseDevice.call(this, dto);
  }
}

Thermostat.prototype = new basedeviceModule.BaseDevice();
Thermostat.prototype.constructor = Thermostat;

Thermostat.prototype.FANMODES = {
  FAN_ON : "on",
  FAN_OFF : "off"
};
Thermostat.prototype.MODE = {
  HEAT : "heat",
  COOL : "cool"
};

Thermostat.prototype.getData = function() {
  throw "Not Implemented by Provider";
};

Thermostat.prototype.setTargetTemperature = function(dto) {
  throw "Not Implemented by Provider";
};

Thermostat.prototype.setMode = function(dto) {
   throw "Not Implemented by Provider";
};

Thermostat.prototype.setFanMode = function(dto) {
   throw "Not Implemented by Provider";
};

Thermostat.prototype.setOnline = function(dto) {
   throw "Not Implemented by Provider";
};			