/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
 var userClient = require("fitbit/userClient");

try {
  var user = new userClient.FitbitUser({username:"karim"}); 
  var spentCalories = user.getSpentCalories({fromDate:"01-01-2012", toDate:"today"});
  console.log(JSON.stringify(spentCalories));
  var myDevices = user.listDevices();
  var myFlex = user.getDevice(myDevices[0].id);
  var alarmSettings  = {
 
    time : "10:50+03:00",
    enabled : true,
    recurring : false,
    weekDays : ("TUESDAY"),
    label : "ring ring it's Tuesday",
    snoozeLength : 1,
 	snoozeCount : 2,
    vibe : "DEFAULT"
  };
  
  //myFlex.addAlarm(alarmSettings);
}catch(exception) {
  return exception;
}			