/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
 return configuration.crossDomainHeaders


//response.setContentType('application/json')  
    //for(var i = 0 ;i < 999 ; i++){
    response.write("hello");
    response.setHeaders(configuration.crossDomainHeaders);
    response.setStatus('400');
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


			