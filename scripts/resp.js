/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 /** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
//response.setContentType('application/json')  
return configuration;

//for(var i = 0 ;i < 999 ; i++){
response.write("hello");
//response.setHeaders(configuration.crossDomainHeaders);
response.setStatus('400');
response.addHeaders(configuration.crossDomainHeaders)
response.addHeaders({ 
  'test':'value 1',
  'test 2': ' hello'
});

response.setHeader('test','val 2');

try{
  // response.write();
}catch(ex){
  //response.write(ex);
}

response.flush();


									