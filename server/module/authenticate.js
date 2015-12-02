//
var google = require('googleapis');
var calendar = google.calendar('v3');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OAuth2 = google.auth.OAuth2;
var serverCredentials;
var schema = require('./schema');

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
                refresh_token: tokens.refresh_token,
                id_token: tokens.id_token
            });
            serverCredentials = (oauth2Client.credentials);

            console.log("the server credentials: ",serverCredentials);

            //mongoose.model('AuthTokens', new Schema({"access_token": String, "refresh_token": String, "id_token": String}, {collection: 'authtokens'}, {autoIndex: false}));
            //var AuthTokens = mongoose.model('AuthTokens');

            var data = new schema.AuthTokens({access_token: serverCredentials.access_token, id_token:serverCredentials.id_token, refresh_token:serverCredentials.refresh_token});
            data.save(function(err,data){
                if (err) console.log("Error ", err);
                console.log("the data from the save ",data);
            });

            //console.log("the authTokens: ", AuthTokens);


            listEvents(oauth2Client);
            //updateEvents(oauth2Client);
            return serverCredentials;
        }
    });

        function listEvents(auth) {
            calendar.events.list({
                auth:auth,
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
                        var attendees = event.attendees;
                        console.log(id, '%s - %s', start, event.summary, attendees);
                    }
                }
                return true;
            });
        }
    function updateEvents(auth) {
        var calendar = google.calendar('v3');
        calendar.events.update({
            auth: auth,
            calendarId: 'vmte39c86sbcmh9fqr58iglsuo@group.calendar.google.com',
            eventId: 'jbmtsjtcjanbienrmhpbhmlnsk',
            sendNotifications: true,
            resource: {
                start: {
                    dateTime: '2015-12-25T22:00:00Z'
                },
                end: {
                    dateTime:'2015-12-25T23:00:00Z'
                },
                summary: "updated on Saturday",
                attendees: [
                    {email: 'pazimmel@gmail.com'},
                    {email: 'stephbealee@gmail.com'}
                ],
                description: "an update"
            }
        }, function(err, response){
            if (err) {
                console.log('The API returned an error: ' + err);
                return;
            } else {
                console.log(response);
                return true;
            }
        });
    }
};



module.exports = authenticate;




