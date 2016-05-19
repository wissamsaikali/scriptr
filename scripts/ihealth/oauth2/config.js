/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 // The name of the app you need to connect to, e.g, 'Nest'
var app = "iHealth";

// The URL prefix to all the app's APIs
var apiUrl = "https://api.ihealthlabs.com:8443/openapiv2"; // production
//var apiUrl = "http://sandboxapi.ihealthlabs.com/openapiv2"; // sandbox

// API version to use (can be empty)
var apiVer = ""; 

// OAuth 2.0: Authorization URI - step1 of OAuth process
var authorizationUrl = "https://api.ihealthlabs.com:8443/OpenApiV2/OAuthv2/userauthorization/"; // production
//var authorizationUrl = "http://sandboxapi.ihealthlabs.com/OpenApiV2/OAuthv2/userauthorization/"; // sandbox

// OAuth 2.0: Authorization URI - step2 of OAuth process (if response_type is "code" usually)
var accessTokenUrl = "https://api.ihealthlabs.com:8443/OpenApiV2/OAuthv2/userauthorization/"; // production
//var accessTokenUrl = "http://sandboxapi.ihealthlabs.com/OpenApiV2/OAuthv2/userauthorization/"; // sandbox

// OAuth 2.0 Client ID
var client_id = "0712a59c9d0b4aae88e9750c76b3a91a"; //production
//var client_id = "5c7a2b2d30d244f48d377d07627dfc5a"; //sandbox;

// OAuth 2.0 grant type, can be left empty
var grantType = "authorization_code";

// Client (consumer) secret
var client_secret = "4f3a7c22ba594d6896b92800b1920280"; // production
//var client_secret = "2a6431f6785a43c2adca3a53481484b2"; // sandbox

// Serial numbers of your iHealth application per API name (sc/sv, check your application's 
// settings on iHealth: http://developer.ihealthlabs.com/developerdetailpage.htm)
var serialNumbers = {
  
  activity:	{
    sc: "ce3c83e560bc43f089aa1c4049f0764d",
    sv: "4c8e26a5dc554020acfabfcafa802560"
  },
  glucose: {
    sc: "ce3c83e560bc43f089aa1c4049f0764d",
    sv: "f73bfd9dc78444a2a9a90b72c44a248d"
  },
  bp: {
    sc: "ce3c83e560bc43f089aa1c4049f0764d",
	sv: "c1242278add3412fac92e1c5f463ca03"
  },
  food:	{
    sc: "ce3c83e560bc43f089aa1c4049f0764d",
	sv: "b3e2124562ff43b48d64c987a437c099"
  },
  sleep:{
    sc: "ce3c83e560bc43f089aa1c4049f0764d",
	sv: "24a640641bc047f7980a8a022de3db9f"
  },
  spo2: {
    sc: "ce3c83e560bc43f089aa1c4049f0764d",
	sv: "2462aa3d8537498098b0949081477d2b"
  },
  sport: {
    sc: "ce3c83e560bc43f089aa1c4049f0764d",
    sv: "d1af97b6d6574483add93f75754d1a74"
  },
  user: {
    sc: "ce3c83e560bc43f089aa1c4049f0764d",
    sv: "0fc630ea3c6f424cb524a3de74b918ed"
  },
  weight: {
    sc: "ce3c83e560bc43f089aa1c4049f0764d",
	sv: "807812f95c924a0ebcae6414cdd5b576"
  }
};

// The OAuth 2.0 type of the returned credential (can be "code" or "token")
var response_type = "code";

// Possible values for "scope", i.e. authorizations requested from users. Can be empty
var scope = "OpenApiActivity OpenApiBG OpenApiBP OpenApiFood	OpenApiSleep OpenApiSpO2 OpenApiSport OpenApiUserInfo OpenApiWeight"; // production
//var scope = "OpenApiActivity OpenApiBG OpenApiBP OpenApiSleep OpenApiSpO2 OpenApiUserInfo OpenApiWeight"; // sandbox

// Where the 3rd party app should send the user after the user grants or denies consent. 
// Optional if you have only specified one callback URI for your application in the settings on
var redirect_uri = "https://api.scriptr.io/ihealth/oauth2/getAccessToken?auth_token=RzM1RkYwQzc4Mg==";

// Some OAuth API do not redirect the parameters you send to the authorization URL so you have
// to add them to the redirectUrl. Notably we need to send the "state" in order to match the
// access token to a user. Set the below to "true" if you need the "state" to be added to the 
// query string of the callback URL
var addStateToRedirectUrl = true;

//optional. Check your target API for values (e.g. "offline)
var access_type="";

//the name of the field used by the OAuth API to return the access token
var accessTokenFieldName = "AccessToken";

//the name of the field used by the OAuth API to return the refresh token, if any
var refreshTokenFieldName = "RefreshToken";

//the name of the field used by the OAuth API to return the refresh token, if any
var userIdFieldName = "UserID";

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