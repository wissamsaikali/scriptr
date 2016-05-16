/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 function test()
{
  var log = require("log");
log.setLevel("debug");
log.debug("hello from lib");
  return 2;
}			