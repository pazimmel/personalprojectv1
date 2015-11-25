//
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var authTokens;
var authenticate = function(code) {
    var CLIENT_ID = "1014545251900-anab20hkgicb30gpsgu7q7vb47pnr326.apps.googleusercontent.com";
    var CLIENT_SECRET = "JnNWn1zLSVLf4kZwwE2XR1eY";
    console.log("in authenticate");
    var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, "http://localhost:5000");
    //var oauth2 = new google.OAuth2(CLIENT_ID, CLIENT_SECRET, 'code')

        //OAuth2.setCredentials({
    //    console.log("in set credentials"),
    //    access_token: access_token,
    //    refresh_token: refresh_token
    //});
    console.log("before getToken ", code);
    //oauth2.getToken(code,function(err, tokens){
    oauth2Client.getToken(code, function(err, tokens) {
        console.log("access token ", tokens.access_token, " refresh token ", tokens.refresh_token);
        // Now tokens contains an access_token and an optional refresh_token. Save them.
        if(!err) {

            oauth2Client.setCredentials({
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token
            });
            authTokens = (oauth2Client.credentials);
            console.log(authTokens);
        }
    });
    return authTokens;
};



module.exports = authenticate;




