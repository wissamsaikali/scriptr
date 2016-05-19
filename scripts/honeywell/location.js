/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
 var deviceFactory = require("honeywell/deviceFactory");

/**
 * Wraps the location concept. Exposes location-oriented APIs as methods.
 * In addition to the mandatory locationID and client parameters, it is also
 * possible to initialize Location with any of the available location properties.
 * This is the case when obtaining instances of Location from user.getLocation() or
 * user.listLocations()
 * @class Location
 * @constructor
 * @param {Object} [dto]
 * @param {String} [dto.locationID] : identifier of the location
 * @param {Object} [dto.client]: an instance of HttpClient with a valid session object
 */
function Location(dto) {
 
  if (!dto || !dto.locationID || !dto.client) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "Location. dto, dto.client and dto.locationID cannot be null or empty"
    };
  }
  
  dto.locationId = dto.locationID;
  delete dto.locationID;
  this._fillProperties(dto);
}

/**
 * Returns the lists of devices that at registered at this location
 * @method listDevices
 * @param {Object} [dto] : optional
 * @param {Boolean} [dto.allData] : include all data that pertains to the devices 
 * @param {Boolean} [dto.filter] : specifies what properties should be returned. Possible values for filter
 * are defined in honeywell/mapping.filter
 * @return {Array} array of Device instances (or specific subclasses)
 * @throws {Error}
 */
Location.prototype.listDevices = function(dto) {
  
  var reqParams = {
    
    url: "api/devices",  
    params: {
      locationId: this.locationId
    },
    method:"GET"
  };
  
  if (dto && dto.filter) {
    reqParams.params.include = dto.filter;
  }
  
  if (dto && dto.allData) {
    reqParams.params.allData = dto.allData;
  }else {
    reqParams.params.allData = false;
  }
  
  var response = this.client.callApi(reqParams);
  var devices = [];
  for (var i = 0; i < response.length; i++) {
  	
    var device = deviceFactory.getDevice(response[i], this.client);
    devices.push(device);
  }
  
  return devices;
};

/**
 * Returns the lists of devices that at registered at this location
 * @method listDevices
 * @param {Object} [dto] : optional
 * @param {Boolean} [dto.allData] : include all data that pertains to the devices 
 * @return {Array} list of alert data structures
 * @throws {Error}
 */
Location.prototype.listAlerts = function(dto) {
  
  var reqParams = {
    
    url: "api/alerting",  
    params: {
      locationId: this.locationId
    },
    method:"GET"
  };
 
  var response = this.client.callApi(reqParams);
  return response;
};

/**
 * Returns an instance of device based on the provided device Id
 * @method getDevice
 * @param {Object} [dto]
 * @param {String} [dto.deviceId] : the identifier of the device
 * @param {Boolean} [dto.allData] : if true, return all data pertaining to that location
 * @param {Boolean} [dto.filter] : specifies what properties should be returned. Possible values for filter
 * are defined in honeywell/mapping.filter
 * @return {Object} and instance of Device or one of its subclasses
 */
Location.prototype.getDevice = function(dto) {
  
  if (!dto || !dto.deviceId) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "Location.getDevice : dto.locationId cannot be null or empty"
    };
  }
  
   var reqParams = {
    
    url: "api/devices/" + dto.deviceId, 
    method:"GET"
  };
  
  var params = {};
  if (dto && dto.filter) {
    params.include = dto.filter;
  }
  
  if (dto && dto.allData) {
    params.allData = dto.allData;
  }else {
    params.allData = false;
  }
  
  if (params) {
    reqParams.params = params;
  }
  var response = this.client.callApi(reqParams);
  var device = deviceFactory.getDevice(response, this.client);
  return device;
};

/*
 *
 */
Location.prototype._fillProperties = function(properties) {
  
  for (var property in properties) {
    this[property] = properties[property];
  }
};			