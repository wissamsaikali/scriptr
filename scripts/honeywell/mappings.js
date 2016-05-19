/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 // Filters that can be used to narrow data obtained when asking for details about a location or device
var filter = {
  
  NotUsed:0, // default value means that include feature shouldn't be used and amount of data will be driven by allData parameter.
  Thermostat:1, // this commands the API to return Thermostat property.
  ThermostatChangeableValues:2, // this commands the API to return ChangeableValues property.
  SmartAway: 4, // this commands the API to return SmartAway property.
  OtaCapabilities:8, // this commands the API to return OtaCapabilities property
  HomeAwaySetpoints:16, // this commands the API to return HomeAwaySetPoints property completely filled with data.
  OneTouchButtons:32, // this commands the API to return OneTouchButtons property.
  SystemConfiguration:64, // this commands the API to return SystemConfiguration property.
  FanData:256, // this commands the API to return Fan property.
  Schedule:1024, // this commands the API to return Schedule property.
  AlertSettings:2048, // this commands the API to return AlertSettings property.
  Humidifier:4096, // this commands the API to return Humidifier property.
  Dehumidifier:8192, // this commands the API to return Dehumidifier property.
  Contractor:16384, // this commands the API to return Contractor property.
  FanStatus:32768, // this commands the API to return Fan property.
  EquipmentStatus:65536 // this commands the API to return EquipmentOutputStatus property.  
};

// possible mode for Honeywell devices
var modes = {
  
  // Possible mode for thermostats. Note that some modes might not be available for a given model
  thermostat : {
    
    EmergencyHeat: "EmergencyHeat", //Emergency heating.
	Heat: "Heat", // Heating.
	Off: "Off", // Thermostat is turned off.
	Cool: "Cool", // Cooling.
	AutoHeat: "AutoHeat", //Autochangeover with active heating mode.
	AutoCool: "AutoCool", //Autochangeover with active cooling mode.
	SouthernAway: "SouthernAway", // Special dehumidification mode.
	DHWOff: "DHWOff", // EMEA Domestic Hot Water - OFF
	DHWOn: "DHWOn" // EMEA Domestic Hot Water - ON
  },
  
  "thermostat.fan": {
    
    Auto: "Auto",
	On: "On",
    Circulate: "Circulate",
    FollowSchedule: "FollowSchedule"
  }
};

// Possible values of status a setpoint can be in for Honeywell devices
var status = {
    
  thermostat : {   
    
    //The thermostat's schedule determines the active setpoint. NextTime tells when the next scheduled change occurs
	Scheduled: "Scheduled", 
    // The active setpoint is a temporary override of the schedule and will end at a specific time that is less than 24 hours
    // in duration (this time is determined by NextTime). 
    Temporary: "Temporary",	
    // The active setpoint is an override of the schedule and will end only by manual means. 
    Hold: "Hold", 	
    // The active setpoint is an override of the schedule and will end after a duration longer than one day 
    // (this duration is determined by VacationHoldDays).
	VacationHold: "VacationHold"
   }
};			