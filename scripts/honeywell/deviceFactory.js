/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
 /**
 * Factory that returns the correct instance of Device subclass according 
 * to the device data that it is provided with. 
 * Update this module whenever you need to support a new type of Honeywell devices
 * @module deviceFactory
 */

var THERMOSTAT = "thermostat";

/**
 * Factory function. 
 * @function getDevice
 * @param {Object} deviceData as returned by honeywell's APIs. Data are used to instanciate a device
 * @param {Object} client: an instance of httpclient to associate to the device instance
 * @return {Object} an instance of Device subsclasses. 
 * @throw {Error} throws an error if the device type was not known
 */
function getDevice(deviceData, client) {
  
  var deviceType = _getType(deviceData);
  if (!deviceType) {
  	
    throw {
      errorCode: "Unknown_Device",
      errorType: "deviceFactory.getDevice : could not determine the type of device based on the provided data " + JSON.stringify(deviceData)
    };
  }
  
  deviceData["client"] = client;
  var deviceModule = require("honeywell/" + deviceType);
  var className = className = deviceType.substring(0,1).toUpperCase() + deviceType.substring(1);
  var deviceInstance = new deviceModule[className](deviceData);
  return deviceInstance;
}

function _getType(deviceData) {
  
  var deviceType = null;
  for (var key in deviceData) {
    
    if (key.indexOf(THERMOSTAT)) {      
      deviceType = "thermostat"; break;
    }
  }
  
  return deviceType;
}			