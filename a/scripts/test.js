/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 response.addHeaders(configuration.crossDomainHeaders);
response.write("hello");
			