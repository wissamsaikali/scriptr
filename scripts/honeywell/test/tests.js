/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 // Only require sessionManagement if you do not intend to use OAuth 
var sessionMgt = require("honeywell/session/sessionManagement");

var userModule = require("honeywell/user");
var mappings = require("honeywell/mappings");

try {

  var data = {};
  
  /**
   * Session authentication. Should only be used by app owner
   */
  
  /*
  var sessionMgr = new sessionMgt.SessionManager({username: "tom@scriptr.io", password: "Scriptr1100io"});
  var user = sessionMgr.openSession();
  */
  
  /**
   * OAuth authentication. Preferred mode.
   */  
  var user = new userModule.User({username:"tom@scriptr.io"});
  
  /*
   * Now that we have an instance of user, we can go ahead and 
   * use the connector, regardless of the way we authenticated him
   */
  
  // Get the account data for the user
  data.accountInfo = user.getAccountInfo();
  
  /* Add a device to the list of accessible devices for that user (only works after
    generating the auth token the first time, within a timeframe of 30 mins !) */
  data.addDeviceToACL = user.addToAccessibleDevicesList([35359]);
  data.accessibleDevices = user.listAccessibleDevices();
  
  // uncomment the below to remove a device from the list of the accessible devices
  // for the user. You will have to re-generate an OAuth token from scratch to put the
  // device back on this list !
  /*if (data.accessibleDevices.length > 0) {
    data.removeDeviceFromACL = 
      user.removeFromAccessibleDevicesList({deviceId:35359, appId:data.accessibleDevices[0].applicationId});
     data.accessibleDevicesAfterRemoval = user.listAccessibleDevices();
  }*/
  
  /* List the known locations declared by the current user */
  var locations = user.listLocations({allData:true, include:{}});
  data.listLocations = locations;
  
  if (locations.length > 0) {
    
    /* Get details about a specific location */
    var location  = data.listLocations[0];
    data.location = location;
    
    // Note: you can also directly obtain an instance of location using user.getLocation(...) as in the below
    // var location = user.getLocation({locationId:data.listLocations[0].locationId, allData:true});
    
    /* List the alerts that were emitted for a given location */
  	var locationAlerts = location.listAlerts();
  	data.locationAlerts = locationAlerts;
    
    /* List all devices associated to the location */ 
    var devices = [];
    devices = location.listDevices();
  	data.devices = devices;
    
    if (devices.length > 0) {
     
      /* Pick a device from the list and get its data */
      var thermostat = devices[0];
      data.thermostatData = thermostat.getData(); // this will refresh data as it might already have been loaded to the instance
      
      /* Comfigure a temperature alert on the device - ONLY if authorized to */
      //data.tempAlertSet = thermostat.setTemperatureAlert({tempLowerThan:60.00, tempHigherThan:68.00, tempLowerThanActive:false, tempHigherThanActive:false});
      
      /* List all alerts on that device */
      //data.thermostatAlerts = thermostat.listAlerts();
                  
      /* Get schedule data for the device */
      //data.schedule = thermostat.getSchedule();
      
      /* Change the thermostat's mode */
      data.thermostatOff = thermostat.changeMode({mode: mappings.modes.thermostat.Heat});
      
      /* Change heating setPoint */
      var heatSetPoint = {
        
        value:75, 
        status: mappings.status.thermostat.Temporary,
        nextTime: "2016-03-04T12:30:00.000Z"
      };
        
      data.changeHeatingSetPoint = thermostat.changeHeatingSetPoint(heatSetPoint);
      
      /* Change cooling setPoint */
      var coolSetPoint = {
        
        value:67, 
        status: mappings.status.thermostat.Temporary,
        nextTime: "2016-03-04T12:30:00.000Z"
      };
      
      data.changeCoolingSetPoint = thermostat.changeHeatingSetPoint(coolSetPoint);
      
      /* Get fan data for the device */
      data.fanData = thermostat.getFanData({allData:true});
      
      /* Change fan's mode */
      data.changeFanMode = thermostat.changeFanMode({mode: mappings.modes["thermostat.fan"].On});
    }
  }
  
  return data;
}catch(exception){
  return exception;
}			