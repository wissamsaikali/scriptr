/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var airqualitysensorModule = require("generic/airqualitysensors/airqualitysensor");

var map = {

	"good": {
		min: 0,
		max: 50,
		color: "green"
	},
	"moderate": {
		min: 51,
		max: 100,
		color: "yellow"
	},
	"unhealthy for sensitive groups": {
		min: 101,
		max: 150,
		color: "orange"
	},
	"unhealthy": {
		min: 151,
		max: 200,
		color: "red"
	},
	"very unhealthy": {
		min: 201,
		max: 300,
		color: "purple"
	},
	"hazardous": {
		min: 301,
		max: 500,
		color: "maroon"
	}
};

var components = {

	"o3": "ozone",
	"PM2,5": "fine particuls",
	"PM10": "coarse particuls",
	"CO": "carbon monoxyde",
	"SO2": "sulfu dioxide",
	"NO2": "nitrous oxide"
};

var VARIATION = 10;

function VirtualAirQualitySensorAdapter(dto) {var log = require("log");log.setLevel("debug");

  if (!storage.global.generic) {
    storage.global.generic = {};
  }
  
  if (!storage.global.generic.virtual) {
    storage.global.generic.virtual = {};
  }
 
  this.id = dto.deviceId.toLowerCase() == "new" ? "" : dto.deviceId;  
  var properties = null; 
  if (this.id){
    
    if (!storage.global.generic.virtual[this.id]) {
     
      throw {        
        errorCode: "Device_Not_Found",
      	errorDetail: "VirtualAirQualitySensorAdapter. Could not find device " + this.id
      };
    }
    
    this.scenario = storage.global.generic.virtual[this.id].scenario;
    this.measures = storage.global.generic.virtual[this.id].measures;
    this.structuredId = storage.global.generic.virtual[this.id].structureId;
  }else {
    
    this.id = this._generateId("aqs");
    this.structureId = this._generateId("s_");
    this.scenario = dto.values.scenario ? dto.values.scenario : this._pickScenario();
    this.measures =  dto.values.measures ? JSON.parse(dto.values.measures) : this._generateMeasures();
    this._persist();
  }
}

VirtualAirQualitySensorAdapter.prototype = new airqualitysensorModule.AirQualitySensor();
VirtualAirQualitySensorAdapter.prototype.constructor = VirtualAirQualitySensorAdapter;

VirtualAirQualitySensorAdapter.prototype.getMeasures = function(){
  return this.measures;
};

VirtualAirQualitySensorAdapter.prototype.setMeasures = function(dto){
  
  if (!dto || !dto.measures) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "dto.measures cannot be null or empty"
    };
  }
  
  this.measures = dto.measures;
  this._persist();
  this._publishChange();
};

VirtualAirQualitySensorAdapter.prototype.setScenario = function(dto){
  
  if (!dto || !dto.scenario) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "dto.scenario cannot be null or empty"
    };
  }
  
  this.scenario = dto.scenario;
  this._persist();
  this._publish();
};
 
VirtualAirQualitySensorAdapter.prototype.getData = function(simulate){

  if (simulate) {
    
  	this.measures = this._generateMeasures();  
    this._persist();
  }
  
  return {
    
    deviceId: this.id,
    scenario: this.scenario,
    measures: this.measures,
    structureId: this.structureId
  };
};

VirtualAirQualitySensorAdapter.prototype._pickScenario = function(){
  
  var scenarios = ["good", "moderate", "unhealthy for sensitive groups", "unhealthy", "very unhealthy", "hazardous"];
  return scenarios[Math.round(Math.random() * scenarios.length)];
};

VirtualAirQualitySensorAdapter.prototype._generateMeasures = function(){

	var values = {};
	var time = new Date().getTime();
	for (var component in components) {
		
   
		var value = Math.round(Math.random() * 50) + map[this.scenario].min + VARIATION;
		values[component] = {
			
			time: time,
			value: value,
			measure: component,
			name: components[component],
			description: this._getDescription(value)
		}
	}	
  
  return values;
};

VirtualAirQualitySensorAdapter.prototype._getDescription =  function(value) {
	
	var names = Object.keys(map);
	var description = "";
	for (var i = 0; i < names.length && !description; i++) {	
    
    var min = map[names[i]].min;
    var max = map[names[i]].max;
		description = (value >= min && value <= max) ? names[i] : "";
	}
	
	if (!description) {
		throw new Error("Impossible value " + value);
	}
	
	return description;
};			