/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
 apsdb.httpRespond(200);
response.setHeader('test', 'test2');
			