/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
 
 var db = require("ige/products");

var shortP = [];
for (var p in db.products) {
  var sp = {
    id: db.products[p].id,
    desc: db.products[p].desc
  };
  
  shortP.push(sp);
}

return shortP;			