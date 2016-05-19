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

Factory.prototype.getProvider = function(dto) {
  
  if (!dto || !dto.username || !dto.locationId) {
    
    throw {
      errorCode: "Invalid_Parameter",
      errorDetail: "Factory. dto.providerId, dto.locationId, deviceId and dto.username should be defined"
    };
  }
  
  return basefactoryModule.BaseFactory.prototype.getProvider.call(this, dto);
};

Factory.prototype._honeywell = function(dto) {
  
  var userModule = require("honeywell/user");
  var user = new userModule.User({username:dto.username});
  var locations = user.listLocations({allData:false, include:{}});
  var thermostat = null;
  for (var i = 0; i < locations.length && !thermostat; i++) {
    
    var devices = locations[i].listDevices();
    for (var j = 0; j < devices.length && !thermostat; j++) {
      
      if(devices[j].deviceID == dto.deviceId) {
        thermostat = devices[j];
      }
    }
  }
  
  if (!thermostat) {
    
    throw {
      errorCode: "Device_Not_Found",
      errorDetail: "Factory. Could not find a device using the following parameters: " + JSON.stringify(dto)
    };
  }
  
  var honeywellModule = require("generic/thermostats/honeywelladapter");
  var honewellAdapter = new honeywellModule.HoneywellThermostatAdapter({id:thermostat.deviceID, client: thermostat});
  return honewellAdapter;
};

Factory.prototype._nest = function(dto) {
  
  var clientModule = require("nest/nestClient");
  var client = new clientModule.NestClient(true);
  var nestadapter = require("generic/thermostats/nestadapter");
  var device = client.getThermostat(dto.deviceId);
  return new nestadapter.NestThermostatAdapter({id:dto.deviceId, client:client});
};

Factory.prototype._virtual = function(dto) {
  
  var virtualModule = require("generic/thermostats/virtual");
  var virtualDevice = new virtualModule.VirtualThermostatAdapter(dto);
  return virtualDevice;
};			