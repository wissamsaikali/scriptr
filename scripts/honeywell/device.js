/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
 /**
 * Base class for all kinds of Honeywell devices
 * @param {Object} [dto] : any thermostat available data
 * @param {String} [dto.deviceID]: the thermostat's id. This is mandatory
 * @param {Object} [dto.client]: an instance of HttpClient. This is mandatory
 * All other dto paramters are optional and can be obtained by invoking getData()
 * @throws {Error}
 */
function Device(dto) {
 
  if (!dto && !dto.inheritance) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: this.constructor.name + ". dto cannot be null or empty"
    };
  }
  
  if (dto.inheritance) {
    return;
  }
  
  if (!dto.deviceID || !dto.client) {

    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: this.constructor.name + ". dto.deviceID and dto.client cannot be null or empty"
    };
  }
   
  this._fillProperties(dto);
}

/**
 * Obtain/refresh data related to the current device
 * @method getData
 * @param {Boolean} [dto.allData] : if true, return all data pertaining to that location
 * @param {Boolean} [dto.filter] : specifies what properties should be returned. Possible values for filter
 * @return {Object} the properties of the current device
 * @throws {Error}
 */
Device.prototype.getData = function(dto) {
  
  var reqParams = {
    
    url: "api/devices/" + this.deviceID, 
    method:"GET"
  };  
  
  if (dto && dto.include) {
    
    reqParams.params =  reqParams.params ?  reqParams.params  : {};
    reqParams.params.include = dto.include;
  }
  
  if (dto && dto.allData) {
    
    reqParams.params =  reqParams.params ?  reqParams.params  : {};
    reqParams.params.allData = dto.allData;
  }
  
  var response = this.client.callApi(reqParams);
  this._fillProperties(response);
  return response;
};

/**
 * List alerts that were created on this device,if any
 * @method listAlerts
 * @return {Array} a list of alerts
 * @throws {Error}
 */
Device.prototype.listAlerts = function() {
	
  var reqParams = {
    
    url: "api/alerting?deviceId=" + this.deviceID, 
    method:"GET"
  };
  
  return this.client.callApi(reqParams);
};

Device.prototype._fillProperties = function(properties) {
  
  for (var property in properties) {
    this[property] = properties[property];
  }
};			