//an idea for this function
    //I could have in here simply the call to a function, something like fireTheUpdate()
    //fireTheUpdate() is a function which exports in the quickstart.js function

    var express = require('express');
    var fs = require('fs');
    var path = require('path');
    var readline = require('readline');
    var google = require('googleapis');
    var googleAuth = require('google-auth-library');

    var SCOPES = ['https://www.googleapis.com/auth/calendar'];
    var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
        process.env.USERPROFILE) + '/.credentials/';
    var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';
    var authObject = require('../routes/login');

    console.log(authObject.authObject);

//// Load client secrets from a local file.
    fs.readFile(path.join(__dirname,'client_secret.json'), function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }
        // Authorize a client with the loaded credentials, then call the
        // Google Calendar API.
        console.log("in the path.join");
        authorize(JSON.parse(content), updateEvents);
        //authorize(JSON.parse(content), listEvents);
    });

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     *
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    function authorize(credentials, callback) {
        console.log("in the authorize");
        var clientSecret = credentials.installed.client_secret;
        var clientId = credentials.installed.client_id;
        var redirectUrl = credentials.installed.redirect_uris[0];
        var auth = new googleAuth();
        var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, function(err, token) {
            if (err) {
                getNewToken(oauth2Client, callback);
            } else {
                oauth2Client.credentials = JSON.parse(token);
                callback(oauth2Client);
            }
        });
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     *
     * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback to call with the authorized
     *     client.
     */
    function getNewToken(oauth2Client, callback) {
        console.log("in the get new token");
        var authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
        });
        console.log('Authorize this app by visiting this url: ', authUrl);
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Enter the code from that page here: ', function(code) {
            rl.close();
            oauth2Client.getToken(code, function(err, token) {
                if (err) {
                    console.log('Error while trying to retrieve access token', err);
                    return;
                }
                oauth2Client.credentials = token;
                storeToken(token);
                callback(oauth2Client);
            });
        });
    }

    /**
     * Store token to disk be used in later program executions.
     *
     * @param {Object} token The token to store to disk.
     */
    function storeToken(token) {
        console.log("in the store token");
        try {
            fs.mkdirSync(TOKEN_DIR);
        } catch (err) {
            if (err.code != 'EEXIST') {
                throw err;
            }
        }
        fs.writeFile(TOKEN_PATH, JSON.stringify(token));
        console.log('Token stored to ' + TOKEN_PATH);
    }
    /**
     * Lists the next 10 events on the user's primary calendar.
     *
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     */
function updateEvents(auth) {
        console.log("in teh update events");
        var calendar = google.calendar('v3');
        calendar.events.update({
            auth: auth,
            calendarId: 'vmte39c86sbcmh9fqr58iglsuo@group.calendar.google.com',
            eventId: '4mtu1klg6680t5eulgall1p4hs',
            sendNotifications: true,
            resource: {
                start: {
                dateTime: '2015-11-24T22:00:00Z'
            },
            end: {
                dateTime:'2015-11-24T23:00:00Z' },
            summary: "updated 2",
            attendees: [
                {email: 'pazimmel@gmail.com'},
                {email: 'stephbealee@gmail.com'}
            ],
            description: "using heroku...."
        }
    }, function(err, response){
        if (err) {
            console.log('The API returned an error: ' + err);
                return;
              } else {
          console.log(response);
        }
       });
}
    //function listEvents(auth) {
    //    var calendar = google.calendar('v3');
    //    calendar.events.list({
    //        auth: auth,
    //        calendarId: 'vmte39c86sbcmh9fqr58iglsuo@group.calendar.google.com',
    //        timeMin: (new Date()).toISOString(),
    //        maxResults: 10,
    //        singleEvents: true,
    //        orderBy: 'startTime'
    //    }, function(err, response) {
    //        if (err) {
    //            console.log('The API returned an error: ' + err);
    //            return;
    //        }
    //        var events = response.items;
    //        if (events.length == 0) {
    //            console.log('No upcoming events found.');
    //        } else {
    //            console.log('Upcoming 10 events:');
    //            for (var i = 0; i < events.length; i++) {
    //                var event = events[i];
    //                var start = event.start.dateTime || event.start.date;
    //                var id = event.id;
    //                var attendees = event.attendees;
    //                console.log(id, '%s - %s', start, event.summary, attendees);
    //            }
    //        }
    //    });
    //}

//var fs = require('fs');
//var path = require('path');
//var readline = require('readline');
//var google = require('googleapis');
//var calendar = google.calendar('v3');
//var OAuth2 = google.auth.OAuth2;
//var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
//    process.env.USERPROFILE) + '/.credentials/';
//var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';
//
//CLIENT_ID = "1014545251900-2566ut3nclo3a655574qb2ndrugdhqeo.apps.googleusercontent.com";
//CLIENT_SECRET="25qGc1AQMlcN5h0nX0bCT7cx";
//
//fs.readFile(path.join(__dirname,'client_secret.json'), function processClientSecrets(err, content) {
//    if (err) {
//        console.log('Error loading client secret file: ' + err);
//        return;
//    }
//    // Authorize a client with the loaded credentials, then call the
//    // Google Calendar API.
//    console.log("in the path.join");
//    authorize(JSON.parse(content), listEvents);
//    //authorize(JSON.parse(content), listEvents);
//});
//
//function authorize(credentials, callback) {
//    console.log("in the authorize");
//    //var clientSecret = credentials.installed.client_secret;
//    //var clientId = credentials.installed.client_id;
//    var redirectUrl = credentials.installed.redirect_uris[0];
//    //var auth = new googleAuth();
//    var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, redirectUrl);
//    //GET /callback?code={authorizationCode}
//        oauth2Client.getToken(code, function(err, tokens) {
//            // Now tokens contains an access_token and an optional refresh_token. Save them.
//            if (!err) {
//                oauth2Client.setCredentials(tokens);
//            }
//        }
//    //// Check if we have previously stored a token.
//    //fs.readFile(TOKEN_PATH, function(err, token) {
//    //    if (err) {
//    //        getNewToken(oauth2Client, callback);
//    //    } else {
//    //        oauth2Client.credentials = JSON.parse(token);
//    //        callback(oauth2Client);
//    //    }
//    //});
//)};
//
//
//function listEvents(auth) {calendar.events.list({
//    auth: auth,
//    calendarId: 'vmte39c86sbcmh9fqr58iglsuo@group.calendar.google.com',
//    timeMin: (new Date()).toISOString(),
//    maxResults: 10,
//    singleEvents: true,
//    orderBy: 'startTime'
//}, function (err, response) {
//    if (err) {
//        console.log('The API returned an error: ' + err);
//        return;
//    }
//    var events = response.items;
//    if (events.length == 0) {
//        console.log('No upcoming events found.');
//    } else {
//        console.log('Upcoming 10 events:');
//        for (var i = 0; i < events.length; i++) {
//            var event = events[i];
//            var start = event.start.dateTime || event.start.date;
//            var id = event.id;
//            var personName = event.attendees;
//            //var email = event.attendees.email;
//            console.log(id, '%s - %s', start, event.summary, personName);
//        }
//    }
//});
//}