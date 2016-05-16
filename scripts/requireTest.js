/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 return require("/folder1/../demo_").demo('here', [null, "testtt", '' == '']);			