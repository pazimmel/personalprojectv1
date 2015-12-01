var express = require('express');
var google = require('googleapis');
var calendar = google.calendar('v3');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OAuth2 = google.auth.OAuth2;
var serverCredentials;
var tokens;
var reminders;
var calendar;

// Mongo Connection //
var mongoURI = "mongodb://localhost:27017/team_manager";
//var mongoURI = "";

var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on('error', function(err){
    if(err) console.log("MONGO ERROR: ", err);
});

mongoDB.once('open', function(){
    console.log("Connected to Mongo, yo!");
});

var update = function() {
    var CLIENT_ID = "1014545251900-anab20hkgicb30gpsgu7q7vb47pnr326.apps.googleusercontent.com";
    var CLIENT_SECRET = "JnNWn1zLSVLf4kZwwE2XR1eY";
    console.log("in authenticate");
    var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, "http://localhost:5000");

    mongoose.model('AuthTokens', new Schema({"access_token": String, "refresh_token": String, "id_token": String}, {collection: 'authtokens'}, {autoIndex: false}));
    var AuthTokens = mongoose.model('AuthTokens');

    mongoose.model('Reminder', new Schema({"first_reminder": Number, "second_reminder": Number, "attendance_reminder": Number, "calendarId": String},
        {collection: "reminder"}, {autoIndex: false}));
    var Reminder = mongoose.model('Reminder');



    //var accessDatabase = function(){
        console.log("before Authtokens");
    //mongoDB calls not working here//
        //AuthTokens.find({}, function(err,data){
            console.log("hi");
        AuthTokens.findById('565dfa5d2ecc35b32cf7162f', function(err,data){
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
        //oauth2Client.credentials = {}

        console.log("after Authtokens");

        Reminder.findById('565dfa5c2ecc35b32cf7162e', function(err,data){
            if (err) console.log("Error: ", err);
            reminder = data;
            //reminder = {
            //    "_id" : ObjectId("565dfa5c2ecc35b32cf7162e"),
            //    "first_reminder" : 5,
            //    "second_reminder" : 2,
            //    "attendance_reminder" : 2,
            //    "__v" : 0
            //};
            console.log("the reminders: ", reminder);
        });

        //calendar = {
        //    "_id" : ObjectId("565b75750e1363170e120f58"),
        //    "summary" : "Calendar with Mongoose",
        //    "id" : "kr2miljb4jpuq1d8qrhgiokn34@group.calendar.google.com",
        //    "__v" : 0
        //};

    //};

    //accessDatabase();
    //access google API
    //function updateEvents(auth, calendar) {
    //    var calendar = google.calendar('v3');
    //    calendar.events.update({
    //        auth: auth,
    //        calendarId: 'vmte39c86sbcmh9fqr58iglsuo@group.calendar.google.com',
    //        eventId: 'jbmtsjtcjanbienrmhpbhmlnsk',
    //        sendNotifications: true,
    //        resource: {
    //            start: {
    //                dateTime: '2015-12-25T22:00:00Z'
    //            },
    //            end: {
    //                dateTime:'2015-12-25T23:00:00Z'
    //            },
    //            summary: "updated on Saturday",
    //            attendees: [
    //                {email: 'pazimmel@gmail.com'},
    //                {email: 'stephbealee@gmail.com'}
    //            ],
    //            description: "an update"
    //        }
    //    }, function(err, response){
    //        if (err) {
    //            console.log('The API returned an error: ' + err);
    //            return;
    //        } else {
    //            console.log(response);
    //            return true;
    //        }
    //    });
    //}
};




update();