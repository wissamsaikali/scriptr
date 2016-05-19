/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 /**
 * This module is in charge of obtaining an OAuth 2.0 access token, either from 
 * a provided code or from a provided refresh token, for a given user.
 * The module stores the access and refresh token in the global storage
 * storage.global.[app]_username_accessToken
 * storage.global.[app]_username_refreshToken
 * @module TokenManager
 */

var config = require("google/oauth2/config");
var util = require("google/oauth2/util");
var http = require("http");

/** 
 * Retrieve the access and refresh tokens of a given user from te global storage
 * This method can throw exceptions
 * @method getPersistedTokens
 * @param {String} username : the name of the user for who we need the corresponding tokens
 * @return {Object} {accessToken, refreshToken}
 */
function getPersistedTokens(username, tokenType) {
 
  var accessToken = storage.global[config.app + "_" + username + "_accessToken"];
  var refreshToken = storage.global[config.app + "_" + username + "_refreshToken"];
  if (!accessToken) {
    
    throw {
      "errorCode": "Missing_Access_Token",
      "errorDetail": "Could not find an access token or a refresh token for this user " + username
    };
  }
  
  return {
    "accessToken": accessToken,
    "refreshToken": refreshToken
  };
}

function saveTokens(dto) {
 
  // retrieve the username who owns this token using the persisted state-username mapping
  var username = dto.username ? dto.username : storage.global[config.app + "_state_" + dto.state];
  if (!username) {

    throw {

      "errorCode": "Inconsistency_Error",
      "errorDetail": "Could not find username " + username + " in store to store the tokens"
    };
  }

  // clean-up the state
  storage.global[config.app + "_state_" + dto.state] = null;  
  
  // save the new tokens
  storage.global[config.app + "_" + username + "_accessToken"] = dto.access_token;
  if (dto.refresh_token) {
  	storage.global[config.app + "_" + username + "_refreshToken"] = dto.refresh_token;
  }
  
  return {
    
    "access_Token": dto.accessToken,
    "refresh_token": dto.refreshToken
  };
};

/**
 * Invoke app's authorization API to obtain an access token
 * This method can throw exceptions
 * @method getAccessToken
 * @param {Object} params
 *	{String} params.state : the state that was generated by oauth/config when issuing the auth request
 *	{String} params.code : the OAuth code returned by the app further to the auth request, to be exchanged for a
 *  an access token
 * @return {Object} the API response. You do not need it normally. Get the tokens using getPersistedTokens()
 */
function getAccessToken(params) {

  if (!params) {
    
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "getAccessToken - params cannot be null or empty"
    };
  }
  
  var sendParams = {};
  if (params.state) {
    sendParams["state"] = params.state;
  }

  if (params.code) {
    sendParams["code"] = params.code;
  }
    
  sendParams["redirect_uri"] = config.redirect_uri;  
  if (config.grantType) {
     sendParams["grant_type"] = config.grantType;
  }
  //sendParams["client_id"] = config.client_id;
  //sendParams["client_secret"] = config.client_secret;
  //return sendParams;
  return this._getToken(sendParams);
}

/**
 * Invoke the app's authorization API to obtain an access token using a refresh token
 * This method can throw exceptions
 * @method getAccessToken
 * @param {String} username : the name of the user for who we need to obtain a new access token
 * @return {Object} the API response. You do not need it normally. Get the tokens using getPersistedTokens()
 */
function refreshAccessToken(username) {
 
  if (!username) {
    
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "You need to pass a username to refresh the token"
    };
  };
  
  console.log("Refreshing token... ");
  var refreshToken = getPersistedTokens(username).refreshToken;
  var refreshParams = {
    
    "grant_type": "refresh_token",
    "refresh_token": refreshToken
  };
  
  return this._getToken(refreshParams, username);
}

function _getToken(params, username) {
 
  var state = params.state;

  if (!config.addStateToRedirectUrl) {
    delete params.state;
  }
  params.client_id = config.client_id;
  params.client_secret = config.client_secret;
 
  var requestObject = {  

    "url": config.accessTokenUrl,
    "method": "POST",
    "params": params,
    "headers": {
      "Authorization": "Basic " +  util.Base64.encode(config.client_id + ":" + config.client_secret),
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
 
  var response = http.request(requestObject);
  var responseBodyStr = response.body;
  var responseObj = null;

  if (response.status == "200") {
	
    if (response.headers["Content-Type"].indexOf("application/json") > -1) {
      
      responseObj = JSON.parse(responseBodyStr);
      // persist the received access and refresh tokens in the storage and associate them to the targeted user
      var dto = {
       
        state: state,
        username: username, 
        access_token: responseObj[config.accessTokenFieldName],
        refresh_token: responseObj[config.refreshTokenFieldName]
      };
      
      //console.log("Saving " +  JSON.stringify(dto));
      saveTokens(dto);
      return responseObj;
    }else {
      
      throw {
        "errorCode": "Unexpected_Response",
        "errorDetail": responseBodyStr
      }
    }    
  }else {
    
    var errorObj = "";
    try {
      
      errorObj = JSON.parse(response.body);
      errorObj = errorObj.error;
    }catch(e) {
      
      try {
        errorObj = JSON.parse(response);
      }catch(e) {
         
        throw {
      
          "errorCode": "Authorization_Failed",
          "errorDetail": response
        };
      }
    };
    
    throw {
      
      "errorCode": "Authorization_Failed",
      "errorDetail": errorObj
    };
  }
}			