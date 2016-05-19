/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
 var lastUpdate = request.parameters.lastUpdate;
storage.global.lastUpdate = lastUpdate;
sendMail("karim@scriptr.io", "scriptr.io", "Latest update", "<h2>Your latest update</h2>" +  lastUpdate);
return storage.global.lastUpdate;			