//an idea for this function
    //I could have in here simply the call to a function, something like fireTheUpdate()
    //fireTheUpdate() is a function which exports in the quickstart.js function





//function updateEvents(auth) {
//        console.log("in teh update events");
//        var calendar = google.calendar('v3');
//        calendar.events.update({
//            auth: auth,
//            calendarId: 'vmte39c86sbcmh9fqr58iglsuo@group.calendar.google.com',
//            eventId: '4mtu1klg6680t5eulgall1p4hs',
//            sendNotifications: true,
//            resource: {
//                start: {
//                dateTime: '2015-11-24T22:00:00Z'
//            },
//            end: {
//                dateTime:'2015-11-24T23:00:00Z' },
//            summary: "updated 2",
//            attendees: [
//                {email: 'pazimmel@gmail.com'},
//                {email: 'stephbealee@gmail.com'}
//            ],
//            description: "using heroku...."
//        }
//    }, function(err, response){
//        if (err) {
//            console.log('The API returned an error: ' + err);
//                return;
//              } else {
//          console.log(response);
//        }
//       });
//}
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


