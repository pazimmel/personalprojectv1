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

var update = function() {
    var CLIENT_ID = "1014545251900-anab20hkgicb30gpsgu7q7vb47pnr326.apps.googleusercontent.com";
    var CLIENT_SECRET = "JnNWn1zLSVLf4kZwwE2XR1eY";
    console.log("in update");
    var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, "http://localhost:5000");

    tokens = {
        "_id" : ObjectId("565dfa5d2ecc35b32cf7162f"),
        "access_token" : "ya29.PQKCMYNkZjE1V_C36HlrpLC829yd6bUUlfVQ5Q_vaCfSeFpDwsrvZHgwLTs8rM87u_TDuQ",
        "id_token" : "eyJhbGciOiJSUzI1NiIsImtpZCI6ImUzZGQzYTZmOGQ0MjlkMWMwNmNlNjAxOTliZmZkZDBiYWI0ZGUzNGUifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXRfaGFzaCI6IjlvYTZ6YVpoMUV1TXFCV3A4bC1MNWciLCJhdWQiOiIxMDE0NTQ1MjUxOTAwLWFuYWIyMGhrZ2ljYjMwZ3BzZ3U3cTd2YjQ3cG5yMzI2LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE3MDMzNjE0NjA2OTIwNDM1MDc5IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjEwMTQ1NDUyNTE5MDAtYW5hYjIwaGtnaWNiMzBncHNndTdxN3ZiNDdwbnIzMjYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJlbWFpbCI6InBhemltbWVsQGdtYWlsLmNvbSIsImlhdCI6MTQ0ODk5OTUxMiwiZXhwIjoxNDQ5MDAzMTEyfQ.ue1s6JWo58hJ6A9UPb8sFu87wZMpWTbCkyPgAzj2gf0e_TSNuZXklbmIs_A3ofWnUUnSTWCSDjV2verIJXWU3dYJ03l7HvmBm-zhSPT9dVxS26EXnAXB8Sq1awQhULYkExXbWCtlsRrHdc2L08j30usNR1hbOu5Mz8lnb35WgkyuQdkPSg0euqrICfUaklzg75q03Z9_6K9i8wAZ7Om6FS0-z1aA6nk0aiShD0R8Bgm6IgoCP1nKs8DUHAF0wdWeo0VWE_wGXd_I84EzzcWH4FknTCzNr0Iy6ECqcqayTL6-fxF_kc_lGs8xlNmL5Qosx1UxOgTdPfGjR_dyrcuNzQ",
        "__v" : 0
    };

    reminders = {
        "_id" : ObjectId("565dfa5c2ecc35b32cf7162e"),
        "first_reminder" : 5,
        "second_reminder" : 2,
        "attendance_reminder" : 2,
        "__v" : 0
    };

    calendarData = {
        "_id" : ObjectId("565b75750e1363170e120f58"),
        "summary" : "Calendar with Mongoose",
        "id" : "kr2miljb4jpuq1d8qrhgiokn34@group.calendar.google.com",
        "__v" : 0
    };


    console.log("before set credentials");

    request.post({url:'https://www.googleapis.com/oauth2/v3/token', form: {refresh_token: tokens.refresh_token, client_id: CLIENT_ID, client_secret: CLIENT_SECRET, grant_type: 'refresh_token'}},
        function (err,response,body) {
            if(err) console.log("error:", err);
            console.log("the body ", body);
            console.log("body['access_token']" ,body.access_token);
            authToday = body;

            oauth2Client.setCredentials({
                access_token: authToday,
                id_token: tokens.id_token,
                refresh_token:tokens.refresh_token
            });

            getEvents(oauth2Client,calendarData);
            //console.log("the response", response);
        });

    oauth2Client.setCredentials({
        access_token: authToday,
        id_token: tokens.id_token,
        refresh_token:tokens.refresh_token
    });




