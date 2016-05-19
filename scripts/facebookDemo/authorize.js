/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
 var fb = require("facebook");
var callbackUrl = "https://api.scriptr.io/facebookDemo/signin?auth_token=" +  encodeURIComponent("RzM1RkYwQzc4Mg==");
var scope = "public_profile,user_friends,email";
var status = "1234567"

return fb.getAuthorizationUrl(callbackUrl, scope, status);			