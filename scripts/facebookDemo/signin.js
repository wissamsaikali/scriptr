/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
 
 var fb = require("facebook");

try {
  var code = request.parameters.code;
  if (code) {   
    return fb.getAccessToken(("https://api.scriptr.io/facebookDemo/signin?auth_token=" + encodeURIComponent("RzM1RkYwQzc4Mg==")), code);
  }else {
    return request;
  }
}catch(exception) {
  return exception;
}
			