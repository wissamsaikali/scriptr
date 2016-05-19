/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
 var pubsub = require("pubsub");
return pubsub.publish("demo_channel", {"message": "hello"});			