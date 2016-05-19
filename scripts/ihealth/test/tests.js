/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var http = require("http");
var userModule = require("ihealth/user");

var reqParams = {
  
  url: "http://sandboxapi.ihealthlabs.com/openapiv2/user/d0ee2c52324d4243acd26f3b4ef32b43.json/",
  method:"GET",
  params: {
    client_id: "5c7a2b2d30d244f48d377d07627dfc5a",
    client_secret: "2a6431f6785a43c2adca3a53481484b2",
    access_token: "gjJemJeqbRhHFG4XpxiAi98-IZXx8bPSLx5y5e5rjfRTZkmNfJUhjdylqQxh6Y-2C4KTsNms-gGDWvAr2JOyeBuLAYaEbc41mVsNrvN8nfSzX2T49NTuKz5A-fKxjN-9eXAntlnuH8lGqimrXFtJzc34QEVZcXEe705SignCZr0"
  }
}

//return http.request(reqParams);

try {

  //var user = new userModule.User({username:"sandboxuser@ihealthlabs.com"});
  var user = new userModule.User({username:"karim@scriptr.io"});
  var data = {};
  data.userGetInfo = user.getInfo();
  //data.listSPO2Measures = user.listSPO2Measures();
  data.listBloodPressureMeasures = user.listBloodPressureMeasures({from:new Date("2016-04-01").getTime()});
  //data.listActivities = user.listActivities();
  //data.getActivityAtDate = user.getActivityAtDate({date:new Date("2016-04-05").getTime()});
  //data.listWeightMeasures = user.listWeightMeasures({from:new Date("2016-04-05").getTime(), to:new Date().getTime()});
  //data.listFatFreeMassMeasures = user.listFatFreeMassMeasures();
  //data.listDiastolicBloodPressureMeasures = user.listDiastolicBloodPressureMeasures();
  //data.listWorkoutMeasures = user.listWorkoutMeasures();
  data.listSleepMeasures = user.listSleepMeasures();
  return data;
}catch(exception) {
  return exception;
}			