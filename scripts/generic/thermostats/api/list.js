/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
 var list = storage.global.generic.virtual ? storage.global.generic.virtual : {};
var filteredList = {};
for (var deviceId in list) {
  
  if (deviceId.indexOf("t_") > -1) {
    filteredList[deviceId] = list[deviceId];
  }
}

return filteredList;			