/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var httpClient = require("honeywell/httpclient");
var config = require("honeywell/oauth2/config");
var locationModule = require("honeywell/location");
var util = require("honeywell/util");

/**
 * This class wraps a Honeywell device user. It should be used as an entry point to obtain
 * instances of the other classes
 * @class User
 * @constructor
 * @param {Object} [dto]
 * @param {String} [dto.username]: the username of the end user
 * @param {Object} [dto.accountInfo]: Optional, data related to the user's account 
 * @throws {Error}
 */
function User(dto) {
  
  if (!dto) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "User. dto cannot be null or empty"
    };
  }
  
  if (!dto.username) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "User. dto.username cannot be null or empty"
    };
  }
 
  this.username = dto.username;
  this._username = util.toStorableUserName(dto.username); 
  this.client = new httpClient.HttpClient({username:this._username});  
  if (dto.accountInfo) {
    this._fillProperties(dto.accountInfo);
  }else {
    this.getAccountInfo();
  }
}

/**
 * Obtain the list of devices that can be controlled by the user
 * @method listAccessibleDevices
 * @return {Array} an array of access control data
 * {
 *   {String} deviceId, {String} deviceName, {String} name : same as device name, {Boolean} accessConfirmed,
 *   {String} applicationId : the identifier of the app acting on behalf of the user,
 *	 {String} applicationName, {String} applicationType
 * }
 * @throws {Error}
 */
User.prototype.listAccessibleDevices = function() {
 
  var reqParams = {
    
    url: "api/accessControlList",   
    method:"GET",
    params: {
      userId: this.userId
    }
  };
  
  return this.client.callApi(reqParams);
};

/**
 * Add 1 or more devices to the list of devices that can be accessed by a given user
 * @method addAccessibleDevices
 * @param {Array} deviceIds
 * @return {String} "success"
 * @throws {Error}
 */
User.prototype.addToAccessibleDevicesList = function(deviceIds) {
  
  if (!deviceIds || deviceIds.length == 0) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "User.addToAccessibleDevicesList : deviceIds cannot be null or empty"
    };
  }
  
  var ids = [].concat(deviceIds); 
  var accessControllistItems = [];
  for (var i = 0; i < ids.length; i++) {
    accessControllistItems.push({DeviceId: ids[i], AccessConfirmed: true});
  }
  
  var reqParams = {
    
    url: "api/accessControlList?userId=" + this.userId,   
    method:"PUT",
    headers: {
      "Content-Type": "application/json"
    },
    
    bodyString: JSON.stringify(accessControllistItems)
  };
  
  this.client.callApi(reqParams);
  return "success";
};

/**
 * Remove the provided thermostat from the list of accessible devices for the current user.
 * CAUTION: you cannot reverse the effect of this method's execution by calling addToAccessibleDevicesList()
 * unless you regenerate a new auth token for the current user (i.e. go through the OAuth process again)
 * @method removeFromAccessibleDevicesList
 * @param {Object} [dto]
 * @param {String} deviceId : the identifier of the device to remove from the list
 * @param {String} appId : the identifier of your application as obtained from Honeywell
 * @return {String} "success"
 * @throws {Error}
 */
User.prototype.removeFromAccessibleDevicesList = function(dto) {
  
  if (!dto || !dto.deviceId || !dto.appId) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "User.removeFromAccessibleDevicesList : dto, dto.deviceUd and dto.appId cannot be null or empty"
    };
  }
  
  var reqParams = {
  
    url: "api/accessControlList?userId=" + this.userId + "&deviceId=" + dto.deviceId + "&applicationId=" + dto.appId,   
    method:"DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  };
  
  this.client.callApi(reqParams);
  return "success";
};

/**
 * Returns basic information about the user's account. Updates the instance's properties that match the properties of the response
 * with their returned values
 * @method getAccountInfo
 * @return {Object} {
 *  {String} "userId", {String} "username", {String} "firstname", {String} "lastname",
 *	{String} "streetAddress", {String} "city", {String} "state", {String} "zipcode",
 *  {String} "country". {String} "telephone", {String} "userLanguage"
 * }
 * @throws {Error}
 */
User.prototype.getAccountInfo = function() {
  
  var reqParams = {
    
    url: "api/accountInfo",   
    method:"GET"
  };
   
  var response = this.client.callApi(reqParams);
  this._fillProperties(response);
  return response;
};

/**
 * Returns the list of all locations created by the end user
 * @method listLocations
 * @param {Object} [dto]
 * @param {Boolean} [dto.allData] : if true, instructs to return all thermostats data at specified location
 * (this overrides the filter if provided)
 * @param {Number} [dto.filter] : specifies what properties should be returned. Possible values for filter
 * are defined in honeywell/mapping.filter
 * @return {Array} list of instances of the location.Location class
 * @throws {Error}
 */
User.prototype.listLocations = function(dto) {
  
  var reqParams = {
    
    url: "api/locations",  
    params: {
      userId: this.userId
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
  var locations = [];
  for (var i = 0; i < response.length; i++) {
    
    var data = response[i];
    data.client = this.client;
    var location = new locationModule.Location(data);
    locations.push(location);
  }
  
  return locations;
};

/**
 * Returns an instance of Location based on the provided location Id
 * @method getLocation
 * @param {Object} [dto]
 * @param {String} [dto.locationId] : the identifier of the location
 * @param {Boolean} [dto.allData] : if true, return all data pertaining to that location
 * @param {Boolean} [dto.filter] : specifies what properties should be returned. Possible values for filter
 * are defined in honeywell/mapping.filter
 * @return {Object} and instance of location.Location
 * @throws {Error}
 */
User.prototype.getLocation = function(dto) {
  
  if (!dto || !dto.locationId) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "User.getLocation : dto.locationId cannot be null or empty"
    };
  }
  
  var reqParams = {
    
    url: "api/locations",  
    params: {
      locationId: dto.locationId
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
  response.client = this.client;
  return new locationModule.Location(response);
};

/*
 *
 */
User.prototype._fillProperties = function(properties) {
  
  if (properties.userID) {
  	
    properties.userId = properties.userID;
    delete properties.userID;
  }
  
  for (var property in properties) {
    this[property] = properties[property];
  }
};			