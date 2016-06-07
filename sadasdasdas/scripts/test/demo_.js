/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var dem = require('folderDemo/demo2');
function demo (val1, val2){
  return val1 + val2 + dem.test();
}
			