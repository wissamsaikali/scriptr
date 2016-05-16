/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
 response.setStatus(200);
response.setHeaders(configuration.crossDomainHeaders);
response.setContentType("text/html");
response.setHeaders({
  'header1' : 'test header'
});
response.setHeaders({
  'header1' : 'test header'
});

response.write('Hello World.');
response.flush();			