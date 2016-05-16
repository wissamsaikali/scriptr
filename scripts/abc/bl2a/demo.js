/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var testtt;


testtt = 'we are here';
return require("../../../demo_").demo('here', [null, testtt, '' == '']);			