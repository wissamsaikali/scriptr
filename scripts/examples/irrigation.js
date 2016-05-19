/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
 // import scriptr.io's connctor to the flower power APIs
var flowerPowerModule = require("parrot/flowerpower/client");
var http = require("http");

// Default water volume to use when watering a plant 
var WATERING_VOLUME = 0.2;
// Average moisture ratio of soils (in case not available)
var AVERAGE_MOISTURE_RATIO = 33;
// Average air temperature
var AVERAGE_TEMP = 25;

var username = "karim@scriptr.io"; // replace with your email

// create an instance of the FlowerPower connector
var flowerpower = new flowerPowerModule.FlowerPower({username: username});

/* 
 * MAIN PROCESS *
 */

var irrigationPlan = [];

// Get the current soil mosture, light, temperature and fertilizer status of all locations of our garden
var locations = flowerpower.getGardenLocationsStatus().locations;

// List all locations of the garden to obtain data such as coordinates and plant name
var locationsData = flowerpower.listLocations();

// Loop through the list of locations. For each location, determine water adjustments depending
// on the current soil moisture ratio and the forecast max temperature at this location
for (var i = 0;  i < locations.length; i++) {
  
  var water = WATERING_VOLUME;
  var waterDelta = getWaterAdjustmentFromSoilMoisture(locations[i]);
  var water = water * (1 +  waterDelta);
  var currentLocationData = locationsData[locations[i].location_identifier];
  waterDelta = getWaterAdjustmentFromWeatherForecast(currentLocationData);
  water = water * (1 + waterDelta);

  // Create irrigation instructions for the current plant
  var irrigationInstruction = {

    location: locations[i].location_identifier,
    plant: currentLocationData.plant_nickname,
    coordinates: currentLocationData.latitude + "," +  currentLocationData.longitude,
    water: water
  };
  
  // add the instructions to the plan
  irrigationPlan.push(irrigationInstruction);
}

// send today's irrigation plan to the user
sendWateringPlan(irrigationPlan, username);

// return the plan to the caller
return irrigationPlan;

/*
 * Determine the needed adjustment of the water volume depending on the soil moisture
 * @param {Object} location : the location status (current values of soil moisture, light, fertilizer, temperature)
 * @return {float} the percentage of water to add to or to remove from the nominal volume
 */
function getWaterAdjustmentFromSoilMoisture(location) {
  
  var waterDelta = 0;
  
  // Get the current soil moisture ratio
  var currentMoistureRatio = location.soil_moisture.gauge_values.current_value;
  
  // Get the expected soil moisture based on the average depletion for this location as the same time of day (stored in scriptr.io's store)
  var currentTime = new Date().getHours();
  var expectedMoistureRatio = AVERAGE_MOISTURE_RATIO - 0.0033 //storage.flowerpower[location_identifier][currentTime].averageDepletion; // we assume here that we already calculated and stored the average depletion
  
  // if the current soil moisture ratio is higher than expected, decrease the volume of water to use proportionally 
  // otherwise, increase it proportionally
  if (currentMoistureRatio > expectedMoistureRatio) {
    return waterDelta - (1 - currentMoistureRatio / expectedMoistureRatio);
  }else {
    return waterDelta + (1 - currentMoistureRatio / expectedMoistureRatio);
  }
}

/**
 * Determine the needed adjustment of the water volume depending on the forecast 
 * max temperature of the day
 * @param {Object} currentLocationData: a location object containing data about the current location
 * such as its coordinates, the plant's name, etc.
 * @return {float} the percentage of water to add to the nominal volume
 */
function getWaterAdjustmentFromWeatherForecast(currentLocationData) {

  // We then invoke the openweathermap API, asking for weather forecast
  // for these coordinates
  var weatherApiParams = {
    
    url: "http://api.openweathermap.org/data/2.5/forecast",
    params: {
    	lat: currentLocationData.latitude,
    	lon: currentLocationData.longitude,
    	appid: "23e9f6f6104525829f7b3efe0eb6fa3b" // Replace with the API key you obtain from OpenWeatherMap
    }
  }
  
  // Parse the response obtained from the API
  var response = http.request(weatherApiParams);
  var weatherForecast = JSON.parse(response.body);
  var forecastForToday = weatherForecast.list[0];
  
  // Get the difference between the average, ideal, temperature and the forecast max temperature
  // use it to determine the percentage of water to add to the nominal volume
  var currentDayMaxTemperature = forecastForToday.main.temp_max / 10;
  if (currentDayMaxTemperature > AVERAGE_TEMP) {
    return (1 - AVERAGE_TEMP / currentDayMaxTemperature);
  }else {
  	return 0;  
  }
}

/**
 * Send the watering plan by email to the given user
 * @param {Array} irrigationPlan : an array of irrigation instructions per plant
 * @param {String} username: the email address of the user to send the plan to
 */
function sendWateringPlan(irrigationplan, username) {
  
  var prettyInstructions = JSON.stringify(irrigationPlan);
  prettyInstructions = prettyInstructions.replace(/\[/g, "");
  prettyInstructions = prettyInstructions.replace(/\{/g, "");
  prettyInstructions = prettyInstructions.replace(/\]/g, "");
  prettyInstructions = prettyInstructions.replace(/\}/g, ",\n");
  sendMail(username, "Smart Watering System", "Today's watering plan", prettyInstructions);
}			