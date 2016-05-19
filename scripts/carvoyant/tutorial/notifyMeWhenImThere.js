/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 // require the 'user' module, where the User class is defined
var userModule = require("carvoyant/user"); 

// create an instance of User from the username of a carvoyant driver (for whom you obtained an auth token)
var user = new userModule.User({username:"karimsaikali"});

try {
  
  // retrieve the current Vehicle instance
  var vehicle = user.getVehicle("42371");

  sub = {
    "notificationType": "GEOFENCE",
    "notificationPeriod": "CONTINUOUS",
    "origin": {
      "timestamp": "20150715T125037+0000",
      "latitude": 38.8903999,
      "longitude": -77.0204623
    },
    "radius": 10,
    "ignitionStatus": "ANY",
    "boundaryCondition": "outside"
  };

  vehicle.subscribeToNotification(sub);
}catch(exception){
  return exception;
}   							