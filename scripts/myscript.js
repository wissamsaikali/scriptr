/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
 var log = require("log");
var lib = require("mylib");
lib.test();
log.setLevel("debug");
log.debug("hello from script");
return 1;			