/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
 
 var loginUrl = require("ihealth/oauth2/loginUrl");
var username = request.parameters.username;
if (!username) {
  
   return {

      "status": "failure",
      "errorCode": "Missing_Parameter",
      "errorDetail": "You need to send the mandatory 'username' parameter with a value"
    };
}

var url = loginUrl.getUrl(username);
apsdb.httpRedirect(url);			