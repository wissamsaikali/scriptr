/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var httpClient = require("google/httpclient");
var config = require("google/oauth2/config");
var util = require("google/util");
var gmail = require("google/apps/mail/gmail");

/**
 * @class User
 * @constructor
 * @param {Object} [dto]
 * @param {String} [dto.username]
 */
function User(dto) {
  
  if (!dto) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "User. dto cannot be null or empty"
    };
  }
  
  if (!dto.username) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "User. dto.username cannot be null or empty"
    };
  }
 
  this.username = dto.username;
  this._username = util.toStorableUserName(dto.username); 
  this.client = new httpClient.HttpClient({username:this._username});
}

/**
 * @method getMailManager
 * @param {Object} [dto]
 * @param {String} [dto.email] : (optional)
 * @return {Object} instance of google/mail/gmail.Gmail class
 */
User.prototype.getMailManager = function(dto) {
  
  if ((!dto ||!dto.email) && this.username.indexOf("@") == -1) {
    
    throw {
      
      errorCode: "No_Email_Address_Defined",
      errorDetail: 
      "User. You either have to specify an email address in the email parameter of user a username that is an email address"
    };
  }
  
  var dto = {
    
    client: this.client, 
    email: dto.email ? dto.email : this.username,
    username:this._username
  };
  
  return new gmail.Gmail(dto);
};			