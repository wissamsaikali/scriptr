/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 

    
response.setStatus(200);
response.setContentType("text/html");
response.setHeaders({
  'header1' : 'test header'
});
response.setHeaders({
  'header1' : 'test header'
});
response.setHeaders(configuration.crossDomainHeaders);
response.write('Hello World.');
response.flush();

		
