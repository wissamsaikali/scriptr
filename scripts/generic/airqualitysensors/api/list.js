/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
 var list = storage.global.generic.virtual ? storage.global.generic.virtual : {};
var filteredList = {};
for (var deviceId in list) {
  
  if (deviceId.indexOf("aqs") > -1) {
    filteredList[deviceId] = list[deviceId];
  }
}

return filteredList;			