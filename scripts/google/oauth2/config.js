/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
 // The name of the app you need to connect to, e.g, 'Nest'
var app = "google";

// The URL prefix to all the app's APIs
var apiUrl = ""; 
var gmailApiUrl = "https://www.googleapis.com/gmail"

// API version to use (can be empty)
var apiVer = ""; 
var gmailApiVers = "v1";

// OAuth 2.0: Authorization URI - step1 of OAuth process
var authorizationUrl = "https://accounts.google.com/o/oauth2/v2/auth";

// OAuth 2.0: Authorization URI - step2 of OAuth process (if response_type is "code" usually)
var accessTokenUrl = "https://www.googleapis.com/oauth2/v4/token";

// OAuth 2.0 Client ID
var client_id = "694649426974-6sg17fup982ktqn0kt0teldjr0sumvf1.apps.googleusercontent.com";

// OAuth 2.0 grant type, can be left empty
var grantType = "authorization_code";

// API key of the application as defined for your Application in the Google developer console
var apiKey = "AIzaSyDhI2XkG5c4WTmWlGnZMAs6Y6_xp6YUfPU";

// Client (consumer) secret
var client_secret = "hD3230UkjrgivFerbKZUnIYQ";

// The OAuth 2.0 type of the returned credential (can be "code" or "token")
var response_type = "code";

// Possible values for "scope", i.e. authorizations requested from users. Can be empty
var scope = "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify";

// Where the 3rd party app should send the user after the user grants or denies consent. 
// Optional if you have only specified one callback URI for your application in the settings on
var redirect_uri = "https://api.scriptrapps.io/google/oauth2/getAccessToken?auth_token=RzM1RkYwQzc4Mg==";

// Some OAuth API do not redirect the parameters you send to the authorization URL so you have
// to add them to the redirectUrl. Notably we need to send the "state" in order to match the
// access token to a user. Set the below to "true" if you need the "state" to be added to the 
// query string of the callback URL
var addStateToRedirectUrl = false;

//optional. Check your target API for values (e.g. "offline)
var access_type="offline";

//the name of the field used by the OAuth API to return the access token
var accessTokenFieldName = "access_token";

//the name of the field used by the OAuth API to return the refresh token, if any
var refreshTokenFieldName = "refresh_token";

// generate a random state to be used in the oauth 2 process' steps
var state = (function() {
  return ('xxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  }));
})();

function getAuthUrl() {
  
  return {

    "url": authorizationUrl,
    "state": state
  }
}			