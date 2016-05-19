/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
 function BaseFactory() {
  
}

BaseFactory.prototype.getProvider = function(dto) {
 
  if (!dto || !dto.providerId |!dto.deviceId) {
    
    throw {
      errorCode: "Invalid_Parameter",
      errorDetail: "Factory. dto.providerId and dto.deviceId should be defined"
    };
  }
  
  var providerFunctionName = "_" + dto.providerId.toLowerCase();
  if (!this[providerFunctionName]) {
   
    throw {
      errorCode: "Unknown_Provider",
      errorDetail: "Factory. Could not find a provider with following id: " + dto.providerId
    };
  }

  return this[providerFunctionName](dto);
};			