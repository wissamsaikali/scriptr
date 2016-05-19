/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 // Gives a more readable value to measure units
var measures = {
  
   	"HP": "Systolic",
  	"LP": "Diastolic",
  	"HR": "Heart rate",
  	"IsArr":"Arrhythmia",
	"BPL": "WHO"
};

// Gives a more readable value to values
var values = {

  "IsArr": {
  
    "-1": "unavailable",
    "1": "heart rate is normal",
    "2": "arrhythmia cordis",
    "3" : "unknown"
  },  
  "HeightUnit": {
    "0": "cm",
    "1": "feet"
  },
  "WeightUnit": {
    "0": "kg",
    "1": "lbs",
    "2": "stone"
  },
  "BPUnit" : {
    "0": "mmHg",
    "1": "KPa"
  },
  "BGUnit": {
    "0": "mg/dl",
    "1": "mmol/l" 
  },
  "FoodUnit": {
    "0": "oz",
	"1": "g"
  },
  "DistanceUnit": {
    "0": "km",
	"1": "mile"    
  }
};
			