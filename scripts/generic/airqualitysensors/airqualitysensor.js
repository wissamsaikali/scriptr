/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
 var basedeviceModule = require("generic/basedevice");

function AirQualitySensor(dto) {
  
  if (dto) {
    basedeviceModule.BaseDevice.call(this, dto);
  }
};

AirQualitySensor.prototype = new basedeviceModule.BaseDevice();
AirQualitySensor.prototype.constructor = AirQualitySensor;

AirQualitySensor.prototype.getMeasures = function(dto) {
  throw "Not Implemented by Provider";
};
			