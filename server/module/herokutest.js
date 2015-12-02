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
    var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, "http://localhost:5000" || "https://whispering-shelf-5691.herokuapp.com");

    tokens = {
        "_id" : ("565e47964a52f62b3435961a"),
        "access_token" : "ya29.PgI7lANxFeXnTc4uIUM7_aSeWb6go8R42n5MOfjAmBJ4VsTh89V-fUmlbwYhClOV29lyLA",
        "id_token" : "eyJhbGciOiJSUzI1NiIsImtpZCI6ImUzZGQzYTZmOGQ0MjlkMWMwNmNlNjAxOTliZmZkZDBiYWI0ZGUzNGUifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXRfaGFzaCI6ImJ5azh2UDF6eEtISVhCX2dwb1RmVXciLCJhdWQiOiIxMDE0NTQ1MjUxOTAwLWFuYWIyMGhrZ2ljYjMwZ3BzZ3U3cTd2YjQ3cG5yMzI2LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE3MDMzNjE0NjA2OTIwNDM1MDc5IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjEwMTQ1NDUyNTE5MDAtYW5hYjIwaGtnaWNiMzBncHNndTdxN3ZiNDdwbnIzMjYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJlbWFpbCI6InBhemltbWVsQGdtYWlsLmNvbSIsImlhdCI6MTQ0OTAxOTI4MiwiZXhwIjoxNDQ5MDIyODgyfQ.Gs3Ll9l5kdIewhhoYN-HzVyHbCpuk1nv2r1nehpBZOWTD2zdve16W1csK1VzB5-_5VZJ2WrpqYV7Hh_SQ-jG9UKP_36KI1KWHRQYF-M9iEs56bs2-OLDtmnkA4kMQm2KVQDfCDiaXvWBWC4WVF0xuYzM9rRgWeie28REc5x3Eh7nSLRx6P04ssoQocbL6YNJFwpAxnSTxAgDfFF_Eb-68xRQM4if5pDgwZwII5F1Pv72fxuDA50yrQa_YNtG4SB2-ctfCtByK7oiM5wwuzK8GP6taWM_dYgjmikNcf97jRFLuqareFc_npX5prrpQV3hQ7UiBLCzooP57fprV5v6KA",
        "refresh_token" : "1/IMiG-Iym41PY1XfCq5K2B7TyjDCbgM9nKgYb0rWMHCU",
        "__v" : 0
    };

    reminders = {
        "_id" : ("565dfa5c2ecc35b32cf7162e"),
        "first_reminder" : 5,
        "second_reminder" : 2,
        "attendance_reminder" : 2,
        "__v" : 0
    };

    calendarData = {
        "_id" : ("565b75750e1363170e120f58"),
        "summary" : "Calendar with Mongoose",
        "id" : "kr2miljb4jpuq1d8qrhgiokn34@group.calendar.google.com",
        "__v" : 0
    };


    console.log("before set credentials");

    //request.post({url:'https://www.googleapis.com/oauth2/v3/token', form: {refresh_token: tokens.refresh_token, client_id: CLIENT_ID, client_secret: CLIENT_SECRET, grant_type: 'refresh_token'}},
    //    function (err,response,body) {
    //        if(err) console.log("error:", err);
    //        console.log("the body ", body);
    //        //console.log("body['access_token']" ,body.access_token);
    //        authToday = body;
    //        console.log("authToday ,",authToday);

            oauth2Client.setCredentials({
                access_token: tokens.access_token,
                id_token: tokens.id_token,
                refresh_token:tokens.refresh_token
            });
            console.log("after setCredentials ",oauth2Client.credentials);
            getEvents(oauth2Client,calendarData);
            //console.log("the response", response);
        //});

    function getEvents(auth, cal){
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
            }
        });
    }
};

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
            summary: "heroku test!",
            attendees: game.attendees,
            description: "this is a test but it's on heroku!"
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

update();




//ya29.PgLVZSTUNxL4akQWLyUiHqhEfk-C7WmLYQWrFjZzuyWFH29j-kt6SvKLIvve0Hr7gxXLcw



