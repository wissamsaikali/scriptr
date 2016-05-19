/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
 var db = require("ige/products");

var id = request.parameters.productId;

if (!id) {
  return {
    errorCode: "Missing_Parameter",
    errorDetail: "You need to pass a value to productId"
  };
}

if (!db.products[id]) {
  return {
    errorCode: "Entity_Not_Found",
    errorDetail: "Could not find a product with following id: " +  id
  };  
}

return db.products[id];			