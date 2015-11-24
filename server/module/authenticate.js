//
//var google = require('googleapis');
//var OAuth2 = google.auth.OAuth2;
//var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
//google.options({ auth: oauth2Client });
//var google = require('googleapis');
//var OAuth2 = google.auth.OAuth2;
//
//CLIENT_ID = "1014545251900-2566ut3nclo3a655574qb2ndrugdhqeo.apps.googleusercontent.com";
//CLIENT_SECRET="25qGc1AQMlcN5h0nX0bCT7cx";
//
//var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
//
//// generate a url that asks permissions for Google+ and Google Calendar scopes
//var scopes = [
//    'https://www.googleapis.com/auth/calendar'
//];
//
//var url = oauth2Client.generateAuthUrl({
//    access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
//    scope: scopes // If you only need one scope you can pass it as string
//});


var fs = require('fs');
var path = require('path');
var readline = require('readline');
var google = require('googleapis');
var calendar = google.calendar('v3');
var OAuth2 = google.auth.OAuth2;
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

CLIENT_ID = "1014545251900-2566ut3nclo3a655574qb2ndrugdhqeo.apps.googleusercontent.com";
CLIENT_SECRET="25qGc1AQMlcN5h0nX0bCT7cx";

fs.readFile(path.join(__dirname,'client_secret.json'), function processClientSecrets(err, content) {
    if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
    }
    // Authorize a client with the loaded credentials, then call the
    // Google Calendar API.
    console.log("in the path.join");
    authorize(JSON.parse(content), listEvents);
    //authorize(JSON.parse(content), listEvents);
});

function authorize(credentials, callback) {
    console.log("in the authorize");
    //var clientSecret = credentials.installed.client_secret;
    //var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    //var auth = new googleAuth();
    var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function(err, token) {
        //if (err) {
            getNewToken(oauth2Client, callback);
        //} else {
        //    oauth2Client.credentials = JSON.parse(token);
        //    callback(oauth2Client);
        //}
    });
}


// Retrieve tokens via token exchange explained above or set them:


function listEvents(auth) {calendar.events.list({
    auth: auth,
    calendarId: 'vmte39c86sbcmh9fqr58iglsuo@group.calendar.google.com',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
}, function (err, response) {
    if (err) {
        console.log('The API returned an error: ' + err);
        return;
    }
    var events = response.items;
    if (events.length == 0) {
        console.log('No upcoming events found.');
    } else {
        console.log('Upcoming 10 events:');
        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            var start = event.start.dateTime || event.start.date;
            var id = event.id;
            var personName = event.attendees;
            //var email = event.attendees.email;
            console.log(id, '%s - %s', start, event.summary, personName);
        }
    }
});
}