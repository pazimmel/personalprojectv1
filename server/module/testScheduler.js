//var sayHello = function(){
//    var hello = "hello server";
//    console.log(hello);
//    return hello;
//    //I want to update my calendar
//    //do I have to set up a route to the client-side to access that calendar?
//    //do an ajax call to some route that gets caught by my app.js ?
//    //http.get('/scheduleUpdate')
//};

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
    var authenticate = require('./authenticate.js');

// Load client secrets from a local file.
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
                    dateTime:'2015-11-24T23:00:00Z'
                },
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



