/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
 var user = require("google/user");

try {
  var user = new user.User({username:"karim@scriptr.io"});
  var gmail = user.getMailManager({email : "karim@scriptr.io"});
  var filter = gmail.createFilter();
  filter.setQuery(filter.subject("set temperature")).AND(filter.isUnread());
  var results = {};
  results.listMessages = gmail.listMessages(filter);
  if (results.listMessages && results.listMessages.length > 0) {
    
    var dto = {
      id: results.listMessages[0].id,
      format: gmail.format.minimal,
      markAsRead: true
    };
    
    results.getMessage = gmail.getMessage(dto);
  }
  
  return results;
}catch(exception){
  return exception;
}			