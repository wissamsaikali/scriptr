/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
 var fb = require("facebook");

//return fb.post("Demo is working");
//return facebookPost("Demo is working");

var credentials = {
   "apiKey": "183382235330402",
   "apiSecret": "2d30108306a31e568118ea3e43bc0f7a",
   "accessToken": "CAACmyQDZBt2IBAOG0NhGbafGIZBVf7sRm5Fi7EGVewZAr0aF4gLgtfZBJVz6tOoHZCBRX6VjkmKjDyZAdSmHjaqZCzcBJhbbDsIKrWpwZAwp1jm5lAGMuGNhCMen5Fiv7CZANuT4pBu7Hbs0HN9ZAgbbZARAdPUSZCqVbMZAZBdw8VNttG4iot4XEvlRFRUXBbIFDE1rEZD"
};

return fb.post("Demo is working", credentials);			