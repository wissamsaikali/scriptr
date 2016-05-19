/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var deviceModule = require("honeywell/device");

/**
 * Wraps thermostat-specific actions and data.
 * @class Thermostat
 * @constructor
 * @param {Object} [dto] : any thermostat available data
 * @param {String} [dto.deviceID]: the thermostat's id. This is mandatory
 * @param {Object} [dto.client]: an instance of HttpClient. This is mandatory
 * All other dto paramters are optional and can be obtained by invoking getData()
 */
function Thermostat(dto) {
  deviceModule.Device.call(this, dto);
}

Thermostat.prototype = new deviceModule.Device({inheritance:true});
Thermostat.prototype.constructor = Thermostat;

/**
 * @method setTemperatureAlert
 * @param {Object} [dto]
 * @param {Boolean} tempHigherThanActive : setting for "Temperature Higher Than" Comfort Alert 
 * (true enables it, false disables it). Optional.
 * @param {Number} tempHigherThan : setting for "Temperature Higher Than" Comfort Alert - temperature limit. Optional.
 * @param {Boolean} tempLowerThanActive	: setting for "Temperature Lower Than" Comfort Alert.
 * (true enables it, false disables it). Optional.
 * @param {Number} tempLowerThan : setting for "Temperature Lower Than" Comfort Alert - temperature limit.
 * @return "success";
 * @throws {Error}
 */
Thermostat.prototype.setTemperatureAlert = function(dto) {
  
  if (!dto) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "Thermostat.setTemperatureAlert : dto cannot be null or empty"
    };
  }
  
  var reqParams = {
    
    url: "api/devices/" + this.deviceID + "/alertSettings/temperature", 
    method:"PUT",
    headers: {
      "Content-Type": "application/json"
    },
    
    bodyString: JSON.stringify(dto)
  };
  
  return this.client.callApi(reqParams);
};

/**
 * @method setHumidityAlert
 * @param {Object} [dto]
 * @param {Boolean} [dto.humidityHigherThanActive] : setting for "humidity Higher Than" Comfort Alert 
 * (true enables it, false disables it). Optional.
 * @param {Number} [dto.humidityHigherThan] : setting for "humidity Higher Than" Comfort Alert - humidity limit. Optional.
 * @param {Boolean} [dto.humidityLowerThanActive] : setting for "humidity Lower Than" Comfort Alert.
 * (true enables it, false disables it). Optional.
 * @param {Number} [dto.humidityLowerThan] : setting for "humidity Lower Than" Comfort Alert - humidity limit.
 * @return "success";
 * @throws {Error}
 */
Thermostat.prototype.setHumidityAlert = function(dto) {
  
  if (!dto) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "Thermostat.setHumidityAlert : dto cannot be null or empty"
    };
  }
  
  var reqParams = {
    
    url: "api/devices/" + this.deviceID + "/alertSettings/humidity", 
    method:"PUT",
    headers: {
      "Content-Type": "application/json"
    },
    
    bodyString: JSON.stringify(dto)
  };
  
  return this.client.callApi(reqParams);
};

/** 
 * Change the thermostat's mode
 * @method changeMode
 * @param {Object} [dto]
 * @param {String} [dto.mode] : mode to switch to. Get possible values from honeywell/mappings
 * @param {String} [dto.changTag] : optional tag to send along with the change mode instruction
 * @return {Object} { {String} id : the identifier of the device} };
 * @throws {Error}
 */
Thermostat.prototype.changeMode = function(dto) {
  
  if (!dto || !dto.mode) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "Thermostat.changeMode : dto.mode cannot be null or empty"
    };
  }
  
  var reqParams = {
    
    url: "api/devices/" + this.deviceID + "/thermostat/changeableValues/mode",
    method:"PUT",
    headers: {
      "Content-Type": "text/json"
    },
   
    bodyString: JSON.stringify(dto.mode)
  };
  
  if (dto.changeTag) {
    reqParams.params.changeTag = dto.changeTag;
  }
  
  return this.client.callApi(reqParams);
};


/** 
 * Change the thermostat's cooling setpoint
 * @method changeCoolingSetPoint
 * @param {Object} [dto]
 * @param {Object} [dto.setPoint] 
 * @param {Number} [dto.setPoint.value] : the new value 
 * @param {String} [dto.setPoint.status] : the status to set, see honeywell/mappings.status.thermostat
 * @param {String} [dto.setPoint.nextTime] : the datetime when the changes are applicable (ISO Date string)
 * @param {String} [dto.type] : "coolSetpoint" or "heatSetpoint"
 * @throws {Error}
 */
Thermostat.prototype.changeCoolingSetPoint = function(dto) {
  return this._changeSetPoint(dto, "coolSetpoint");  
};

/** 
 * Change the thermostat's heating setpoint
 * @method changeHeatingSetPoint
 * @param {Object} [dto]
 * @param {Object} [dto.setPoint] 
 * @param {Number} [dto.setPoint.value] : the new value 
 * @param {String} [dto.setPoint.status] : the status to set, see honeywell/mappings.status.thermostat
 * @param {String} [dto.setPoint.nextTime] : the datetime when the changes are applicable (ISO Date string)
 * @param {String} [dto.type] : "coolSetpoint" or "heatSetpoint"
 * @throws {Error}
 */
Thermostat.prototype.changeHeatingSetPoint = function(dto) {
  return this._changeSetPoint(dto, "heatSetpoint");  
};

/**
 * @method getFanData
 * @param {Object} [dto]
 * @param {Boolean} [dto.allData] : include all fan-related data (optional, defaults to false)
 * @return {Object} {
 *  {Array} allowedModes: allowed fan modes
 *	{Object} changeableValues: properties of the fan that can be modified
 *	{Boolean} fanRunning
 * }
 */
Thermostat.prototype.getFanData = function(dto) {

  var reqParams = {
    
    url: "api/devices/" + this.deviceID + "/fan", 
    method:"GET",
  };
  
  if (dto && dto.allData) {
    request.parameters.allData = dto.allData;
  }else {
    request.parameters.allData = false;
  }
  
  return this.client.callApi(reqParams);
};

/**
 * @method changeFanMode
 * @param {Object} [dto]
 * @param {Boolean} [dto.mode] : the mode to switch to. Possible values are defined in honeywell/mapping/modes["thermostat.fan"]
 * @return {Object} { {String} id: identifier of recorded insruction }
 * @throws {Error}
 */
Thermostat.prototype.changeFanMode = function(dto) {

  if (!dto || !dto.mode) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "Thermostat.changeFanMode : dto.mode cannot be null or empty"
    };
  }
  
  var reqParams = {
    
    url: "api/devices/" + this.deviceID + "/fan/changeableValues", 
    method:"PUT",
    headers: {
      "Content-Type": "application/json"
    },
   
    bodyString: JSON.stringify({mode:dto.mode})
  };
  
  return this.client.callApi(reqParams);
};

/**
 * @method getSchedule
 * @return {Object} {
 * 	{Array} schedulePeriods, array of schedulePerio objects 
 *		{String} day: a day of the week, e.g. "Monday",
 *		{String} "periodType": e.g. "WakeOcc1",
 *		{Number} "startTime": 24,
 *		{Boolean} "isCancelled"
 *		{Number} "heatSetpoint": 70,
 *		{String} "fanMode": e.g."Auto"
 *}
 * @throws {Error}
 */
Thermostat.prototype.getSchedule = function() {
  
  var reqParams = {
    
    url: "api/schedule/" + this.deviceID, 
    method:"GET"
  };
  
  return this.client.callApi(reqParams);
};

/*
 * Change a setpoint of the thermostat
 * @method _changeSetPoint
 * @param {Object} [dto] 
 * @param {Object} [dto.setPoint] 
 * @param {Number} [dto.setPoint.value] : the new value 
 * @param {String} [dto.setPoint.status] : the status to set, see honeywell/mappings.status.thermostat
 * @param {String} [dto.setPoint.nextTime] : the datetime when the changes are applicable (ISO Date string)
 * @param {String} type : "coolSetpoint" or "heatSetpoint"
 * @throws {Error}
 */
Thermostat.prototype._changeSetPoint = function(dto, type) {
  
  if (!dto) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "Thermostat._changeSetPoint (" + type + ") : dto cannot be null or empty"
    };
  }
  
  var reqParams = {
    
    url: "api/devices/" + this.deviceID + "/thermostat/changeableValues/" + type,
    method:"PUT",
    headers: {
      "Content-Type": "application/json"
    },
   
    bodyString: JSON.stringify(dto)
  };
  
  if (dto.changeTag) {
    reqParams.params.changeTag = dto.changeTag;
  }
  
  return this.client.callApi(reqParams);
};			