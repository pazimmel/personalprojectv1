var express = require('express');
var google = require('googleapis');
var calendar = google.calendar('v3');
var mongoose = require('mongoose');
var mongo = require('./mongoose');
var schema = require('./schema');
var request = require('request');

//var Schema = mongoose.Schema;
var OAuth2 = google.auth.OAuth2;
//var CLIENT_ID = "1014545251900-anab20hkgicb30gpsgu7q7vb47pnr326.apps.googleusercontent.com";
//var CLIENT_SECRET = "JnNWn1zLSVLf4kZwwE2XR1eY";
//var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, "http://localhost:5000");
//google.options({ auth: oauth2Client });
var serverCredentials;
var tokens;
var reminders;
var calendarData;
var authToday;

mongo.mongoDB;
mongo.mongoURI;
//// Mongo Connection //
//var mongoURI = "mongodb://localhost:27017/team_manager";
////var mongoURI = "";
//
//var mongoDB = mongoose.connect(mongoURI).connection;
//
//mongoDB.on('error', function(err){
//    if(err) console.log("MONGO ERROR: ", err);
//});
//
//mongoDB.once('open', function(){
//    console.log("Connected to Mongo, yo!");
//});

var update = function() {
    var CLIENT_ID = "1014545251900-anab20hkgicb30gpsgu7q7vb47pnr326.apps.googleusercontent.com";
    var CLIENT_SECRET = "JnNWn1zLSVLf4kZwwE2XR1eY";
    console.log("in update");
    var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, "http://localhost:5000");

    //request.post({url:'http://service.com/upload', form: {key:'value'}}, function(err,httpResponse,body){ /* ... */ })
    //request.post({url:'https://www.googleapis.com/oauth2/v3/token'},
    //    {refresh_token:tokens.refresh_token, client_id: CLIENT_ID, client_secret: CLIENT_SECRET, grant_type:refresh_token}, function(err,response,body){
    //        console.log("the response ",response);
    //        console.log("the body ", body);
    //    });
    //mongoose.model('AuthTokens', new Schema({"access_token": String, "refresh_token": String, "id_token": String}, {collection: 'authtokens'}, {autoIndex: false}));
    //var AuthTokens = mongoose.model('AuthTokens');
    //
    //mongoose.model('Reminder', new Schema({"first_reminder": Number, "second_reminder": Number, "attendance_reminder": Number, "calendarId": String},
    //    {collection: "reminder"}, {autoIndex: false}));
    //var Reminder = mongoose.model('Reminder');



    //var accessDatabase = function(){
        //console.log("before Authtokens");
    //mongoDB calls not working here//
        //AuthTokens.find({}, function(err,data){
           // console.log("hi");

    var accessDatabase = function() {
        console.log("in accessDB");

        var promise1 = schema.AuthTokens.findById('565e47964a52f62b3435961a', function (err, data) {
            if (err) console.log("Error: ", err);
            tokens = data;
            //tokens = {
            //    "_id" : ObjectId("565dfa5d2ecc35b32cf7162f"),
            //    "access_token" : "ya29.PQKCMYNkZjE1V_C36HlrpLC829yd6bUUlfVQ5Q_vaCfSeFpDwsrvZHgwLTs8rM87u_TDuQ",
            //    "id_token" : "eyJhbGciOiJSUzI1NiIsImtpZCI6ImUzZGQzYTZmOGQ0MjlkMWMwNmNlNjAxOTliZmZkZDBiYWI0ZGUzNGUifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXRfaGFzaCI6IjlvYTZ6YVpoMUV1TXFCV3A4bC1MNWciLCJhdWQiOiIxMDE0NTQ1MjUxOTAwLWFuYWIyMGhrZ2ljYjMwZ3BzZ3U3cTd2YjQ3cG5yMzI2LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE3MDMzNjE0NjA2OTIwNDM1MDc5IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjEwMTQ1NDUyNTE5MDAtYW5hYjIwaGtnaWNiMzBncHNndTdxN3ZiNDdwbnIzMjYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJlbWFpbCI6InBhemltbWVsQGdtYWlsLmNvbSIsImlhdCI6MTQ0ODk5OTUxMiwiZXhwIjoxNDQ5MDAzMTEyfQ.ue1s6JWo58hJ6A9UPb8sFu87wZMpWTbCkyPgAzj2gf0e_TSNuZXklbmIs_A3ofWnUUnSTWCSDjV2verIJXWU3dYJ03l7HvmBm-zhSPT9dVxS26EXnAXB8Sq1awQhULYkExXbWCtlsRrHdc2L08j30usNR1hbOu5Mz8lnb35WgkyuQdkPSg0euqrICfUaklzg75q03Z9_6K9i8wAZ7Om6FS0-z1aA6nk0aiShD0R8Bgm6IgoCP1nKs8DUHAF0wdWeo0VWE_wGXd_I84EzzcWH4FknTCzNr0Iy6ECqcqayTL6-fxF_kc_lGs8xlNmL5Qosx1UxOgTdPfGjR_dyrcuNzQ",
            //    "__v" : 0
            //};
            console.log("the tokens: ", tokens);
        });

        var promise2 = promise1.then(function() {
            console.log("before set credentials");
            //oauth2Client.checkAuth(tokens, function(err, resp){
            //    if (err) console.log("Error :", err);
            //    console.log("the response from getToken ",resp)
            //});
            //console.log("teh request ",request);
            //request.get("http://www.google.com", function(err,response, body){
            //    if (err) console.log(err);
            //    console.log("the body ",body);
            //    console.log("the response ",response);
            //});
            request.post({url:'https://www.googleapis.com/oauth2/v3/token', form: {refresh_token: tokens.refresh_token, client_id: CLIENT_ID, client_secret: CLIENT_SECRET, grant_type: 'refresh_token'}},
                function (err,response,body) {
                    if(err) console.log("error:", err);
                    console.log("the body ", body);
                    console.log("body['access_token']" ,body.access_token);
                    authToday = body;
                    //console.log("the response", response);
                });

            //    ,
            //        client_id: CLIENT_ID,
            //        client_secret: CLIENT_SECRET,
            //        grant_type: refresh_token
            //    }
            //);
            /*
             form: , function (err,response,body) {
             console.log("error:", err);
             console.log("the body ", body);*/

            //
            //request({
            //        url:'https://www.googleapis.com/oauth2/v3/token',
            //        method: 'POST',
            //        //headers: {
            //        //    "content-type": "application/x-www-form-urlencoded"},
            //        body: {
            //            refresh_token:tokens.refresh_token,
            //            client_id: CLIENT_ID,
            //            client_secret: CLIENT_SECRET,
            //            grant_type:refresh_token
            //        }
            //        //refresh_token:tokens.refresh_token,
            //        //client_id: CLIENT_ID,
            //        //client_secret: CLIENT_SECRET,
            //        //grant_type:refresh_token
            //    }, function(err,body,response) {
            //
            ////{json: {refresh_token:tokens.refresh_token, client_id: CLIENT_ID, client_secret: CLIENT_SECRET, grant_type:refresh_token}}, function(err,response,body){
            //        if (err) console.log ("The error: ", err);
            //        console.log("the response ",response);
            //        console.log("the body ", body);
            //    return body;
            //    });



            oauth2Client.setCredentials({
                access_token: authToday,
                id_token: tokens.id_token,
                refresh_token:tokens.refresh_token
            });

        });
        promise2.then(function(){
            console.log("after setCredentials ",oauth2Client.credentials);
                schema.Calendar.findById('565b75750e1363170e120f58', function (err, data) {
                    if (err) console.log("Error: ", err);
                    calendarData = data;
                    console.log("in Calendarfind ", calendarData);

                    getEvents(oauth2Client,calendarData);
                    //getEvents();
                });
            });
            //console.log("after setCredentials ", oauth2Client.credentials);

            schema.Reminder.findById('565dfa5c2ecc35b32cf7162e', function (err, data) {
                if (err) console.log("Error: ", err);
                reminders = data;
                console.log("in Reminderfind ", reminders);
            });

    };
    function getEvents(auth,cal) {
        console.log("in get events");
        calendar.events.list({
            auth:auth,
            calendarId: cal.id,
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
                console.log("event to check ", events[0]);
                console.log("event id? ", events[0].id);
                reminder(events[0], cal, auth);
                //checkEvent(events[0], cal, auth);
                //console.log('Upcoming 10 events:');
                //for (var i = 0; i < events.length; i++) {
                //    var event = events[i];
                //    var start = event.start.dateTime || event.start.date;
                //    var id = event.id;
                //    var attendees = event.attendees;
                //    console.log(id, '%s - %s', start, event.summary, attendees);
                    //var game = events[0];
                    //var gameTime = game.start.dateTime;
                    //var today = new Date();
                    //var startDate = new Date(gameTime);
                    //console.log("today day ", today.getDay());
                    //console.log("startDate ", startDate.getDay());
                }

            return true;
        });
    }
    accessDatabase();
            //get soonest event

    //var closestEvent = event[0];
    //        //get number of days event is away
    //            //get today
    //            var today = new Date();
    //            Date.getDay(today);
    //            //get event date
    //            Date.getDay(event[0].start);

        //getEvents(oauth2Client,calendarData);

        //calendar = {
        //    "_id" : ObjectId("565b75750e1363170e120f58"),
        //    "summary" : "Calendar with Mongoose",
        //    "id" : "kr2miljb4jpuq1d8qrhgiokn34@group.calendar.google.com",
        //    "__v" : 0
        //};

};

//function getEvents(auth, cal) {
//    console.log("in get events");
//    calendar.events.list({
//        auth:auth,
//        calendarId: cal.id,
//        timeMin: (new Date()).toISOString(),
//        maxResults: 10,
//        singleEvents: true,
//        orderBy: 'startTime'
//    }, function (err, response) {
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
//        return true;
//    });
//}

function checkEvent (game, cal, auth){
    var today = new Date();
    var gameTime = game.start.dateTime;
    var gameDate = new Date(gameTime);
    var gameDay = gameDate.getDay();
    var todayDay = today.getDay();
    gameDay -= todayDay;
    todayDay -= todayDay;

    console.log("todayDay ",todayDay);
    console.log("gameDay ",gameDay);
    if (gameDay > 0){
        if (gameDay <=reminders.second_reminder) {
            secondReminder(game, cal, auth);
        } else if (gameDay<=reminders.first_reminder) {
            firstReminder(game, cal, auth);
        }
        if(gameDay <=reminders.attendance_reminder){
            attendanceReminder(game, cal, auth);
        }
    }




}

function reminder(game, cal, auth) {
    var calendar = google.calendar('v3');
    calendar.events.update({
        auth: auth,
        calendarId: cal.id,
        eventId: game.id,
        sendNotifications: true,
        resource: {
            start: {
                dateTime:game.start.dateTime
            },
            end: {
                dateTime:game.end.dateTime
            },
            summary: "Game coming soon",
            attendees: game.attendees,
            description: "Make sure to RSVP if you haven't. Look forward to seeing y'all there"
        }
    }, function(err, response){
        if (err) {
            console.log('The API returned an error: ' + err);
            return err;
        } else {
            console.log(response);
            return true;
        }
    })
}

function attendanceReminder(game,auth,cal){

}

function updateEvents(auth, cal) {
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


update();

//get closest event
    //look at events[0]

