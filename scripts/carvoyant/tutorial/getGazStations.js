/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 // require the 'http' module, which allows you to invoke third party APIs
var http = require("http");

// require the 'user' module, where the User class is defined
var userModule = require("carvoyant/user"); 

// create an instance of User from the username of a carvoyant driver (for whom you obtained an auth token)
var user = new userModule.User({username:"edison"});

// get the list of vehicles owned by this user and known to carvoyant
var vehicles = user.listVehicles();

// loop through the list of vehicles
var alertedCars = [];
try {
  for (var i = 0; i < vehicles.length; i++) {
    
    // retrieve the current Vehicle instance
    var vehicle = user.getVehicle(vehicles[i].vehicleId); 
    
    // get the current vehicle's fuel level
    var fuelLevel = vehicle.getFuelLevel();
    
    // compare the fuel level to the min threshold 
    if (fuelLevel < 100) {
    
      // get the user's email address form his account info
      var accountsList = user.listAccounts();
      var email = accountsList.accounts[0].email; // we assume the user has one account
      
      // invoke the NREL APIs (https://developer.nrel.gov) to get the list 
      // of fuel stations near the vehicle's latest location (replace the api key with yours)
      var vehicleInfo = vehicle.getInfo();
      if (vehicleInfo.lastWaypoint) { // check if there is a known last location
      
        // prepare the request
        var queryObject  = {
        "url": "https://api.data.gov/nrel/alt-fuel-stations/v1.json",
        "params": {
          "limit":1,
          "api_key": "EXS3dziSzzrCg8yM6D1Elnyt5MXPVk1Wi85thvHD",
          "latitude": vehicleInfo.lastWaypoint.latitude,
          "longitude": vehicleInfo.lastWaypoint.longitude
        }
      }; 
      
      // invoke the third party API 
      var fuelStationsApiResponse = http.request(queryObject);
      var fuelStations = (JSON.parse(fuelStationsApiResponse.body))["fuel_stations"];
      
        // send the list of fuel stations by email to the user, using the built-in 'sendMail' object
      var emailConfig = {
        "to": email,
        "fromName": "Carvoyant&scriptr.io",
        "subject": "Fuel alert",
        "body": (JSON.stringify(fuelStations)).replace(/,/g, '<br>')
      };
      
      sendMail(emailConfig.to, emailConfig.fromName, emailConfig.subject, emailConfig.body);
      
      // push a information string into the alertedCars array  
      alertedCars.push("sent alert to vehicle " + vehicleInfo.vehicleId); 
      }      
    }
  }
  return alertedCars;
}catch(exception) {
  return exception;
}

// return an error msg
return "no vehicle found";   							