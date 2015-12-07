//login controller//
myApp.controller("loginController", ["$scope", "$http", "GAuth", '$location', function($scope, $http, GAuth, $location){
    //function onSuccess(googleUser) {
    //    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    //}
    //function onFailure(error) {
    //    console.log(error);
    //}



        //cmApiService.execute('grantOfflineAccess', params).then($scope.signInCallback);
        //auth2.grantOfflineAccess({'redirect_uri': 'postmessage'}).then($scope.signInCallback);
    $scope.googleLogin = function(){
        console.log("click");
        //GAuth.checkAuth().then(
        //    function() {
        //        $location.path('/playerAttendance'); // an example of action if it's possible to
        //        // authenticate user at startup of the application
        //    },
        //    function() {
        //        $location.path('/login');       // an example of action if it's impossible to
        //        // authenticate user at startup of the application
        //    }
        //);
        //GApi.executeAuth('calendar','grantOfflineAccess',({'redirect_uri': 'postmessage'})).then($scope.signInCallback)
        GAuth.login().then(function(){
            //GApi.executeAuth('calendar','grantOfflineAccess',({'redirect_uri': 'postmessage'})).then($scope.signInCallback);
            $location.path('/playerAttendance');
        });
        //GAuth.checkAuth().then(
        //    function() {
        //        $location.path('/playerAttendance'); // an example of action if it's possible to
        //        // authenticate user at startup of the application
        //    },
        //    function() {
        //        $location.path('/login');       // an example of action if it's impossible to
        //        // authenticate user at startup of the application
        //    }
        //);

    };

    //$scope.signInCallback = function(authResult){
    //    console.log(authResult['code']);
    //    if (authResult['code']){
    //
    //        $http({
    //            url: '/login',
    //            method: "POST",
    //            params: {code: authResult['code']}
    //        }).then(
    //            function(response){
    //
    //                console.log(response);
    //
    //            }
    //        )
    //    } else {
    //        console.log("there was an error");
    //    }
    //};
}]);
///////////////////////////////
///Navigation Controller////////
////////////////////////////
myApp.controller('NavController', ['$scope','$location', function($scope, $location){
    $scope.isActive = function (viewLocation) {
        //console.log("in the isActive function ", $location.path());
        return viewLocation === $location.path();
    };

    //$scope.go = function ( path ) {
    //    $location.path( path );
    //};
}]);

/////////////////////////
//ATTENDANCE CONTROLLER//
/////////////////////////
myApp.controller("attendanceController", ["$scope", "$http", "ManagerService", "GApi", "$filter", "uiGridConstants", "moment",
    function($scope, $http, ManagerService, GApi, $filter, uiGridConstants, moment){

    $scope.gridOptions1 = {};
    $scope.gridOptions2 = {};
    $scope.attendance = {};
    $scope.schedule = {};
    $scope.currentCalendars = {};
        //$scope.compareArray = [];
    $scope.selectedCalendar = {};
    $scope.selected = {};
        $scope.eventsData = [];
    $scope.game = {};
        $scope.game.subArray = [];

        $scope.game.subEmails = [];
        $scope.game.selectedGame = {};
        $scope.updatedEvent = {};

    //
    //    console.log("scope.now._d ",$scope.now.date);
    $scope.managerService = ManagerService;

    $scope.gridOptions2 = {
        columnDefs: [
            {field: "start.dateTime", visible: false, sort: {direction: uiGridConstants.ASC,
                priority: 0}
            },
            {field: "summary", name: "Event", visible: false},
            {field: "schedule_date", name: "Date"},
            {field: "display_start", name: "Time"},
            {field: "location", name: "Location"},
            {name: 'attendance', displayName: 'Attendance', cellTemplate: '<button id="attendanceBtn" type="button" ' +
            'class="btn-large" ng-model = "selected.game" ng-click="grid.appScope.getAttendance(row.entity)">attendance</button>'}
        ]
    };

    $scope.getCalendars = function(){
        $scope.managerService.retrieveCalendar().then(function(){
            $scope.currentCalendars = $scope.managerService.displayCalendar();
            console.log("result from getCalendars, ",$scope.currentCalendars);
            console.log("currentCalendars id, ", $scope.currentCalendars[0].id);
            if(!$scope.selectedCalendar.calendar){
                //$scope.today = new Date();
                //for(var i = 0; i<$scope.currentCalendars.length; i ++){
                //    $scope.compareArray.push({i:$scope.currentCalendars[i].start.dateTime});
                //}
                $scope.selectedCalendar.calendar = $scope.currentCalendars[0];

                $scope.managerService.setCalendarId($scope.selectedCalendar.calendar.id);

                $scope.getEvents($scope.currentCalendars[0]);

            }

            //ds061464.mongolab.com:61464/teammanagerz

            return $scope.currentCalendars;
        });
    };

    $scope.getEvents = function(calendar){
        console.log("in getEvents");
        $scope.calendarToGet = {
            calendarId: calendar.id,
            timeMin: (new Date()).toISOString(),
            maxResults: 20,
            singleEvents: true,
            orderBy: 'startTime'
        };

        //console.log("$scope.selected.game ",$scope.selected.game);
        GApi.executeAuth('calendar', 'events.list', $scope.calendarToGet).then(function(resp){
        //GApi.executeAuth('calendar', 'events.list', {calendarId: calendar.id}).then(function(resp){
            //console.log("resp.items ",resp.items);

            //console.log("calendar.calendarID, ",$scope.selectedCalendar.calendarId);
            //console.log("calendar.calendar.id, ",$scope.selectedCalendar.calendar.id);
            //$scope.managerService.setCalendarId($scope.selectedCalendar.calendar.id);
            //console.log("in the managerService, ",$scope.managerService.getCalendarId());

            $scope.gridOptions2.data = resp.items;
            console.log("gridOptions2.data ",$scope.gridOptions2.data);

            for(var i =0;i<$scope.gridOptions2.data.length;i++){

                //$scope.eventsData[i] = $scope.gridOptions2.data[i];
                //$scope.game.date = moment($scope.gridOptions2.data[i].start.dateTime).fromNow(true);
                //console.log($scope.game.date);
                //console.log("the difference in time?, ",$scope.now.date.diff($scope.gridOptions2.data[i].start.dateTime));
                $scope.gridOptions2.data[i].schedule_date = $filter('date')($scope.gridOptions2.data[i].start.dateTime,'shortDate');
                $scope.gridOptions2.data[i].display_date = $filter('date')($scope.gridOptions2.data[i].start.dateTime,'EEEE, MMM d');
                $scope.gridOptions2.data[i].display_start = $filter('date')($scope.gridOptions2.data[i].start.dateTime,'shortTime');



            }
            if(!$scope.selected.date){
                //console.log("in if loop for attendance");
                $scope.getAttendance($scope.gridOptions2.data[0]);
            }
            //$filter('date')($scope.gridOptions.data.start.dateTime, "mediumTime");
            //console.log("gridpOptions2.data ",$scope.gridOptions2.data);
            return $scope.gridOptions2.data;
        });
    };
    $scope.getAttendance = function(row){
        //console.log("in getAttendance, ",row);
        $scope.selected.display_date = row.display_date;
        $scope.selected.display_start = row.display_start;
        $scope.gridOptions1.data = row.attendees;
        $scope.game.selectedGame = row;
        //console.log("selected game to input in calendar: ", $scope.game.selectedGame);
    };
    $scope.inviteSubs = function() {
        console.log("calendar id ", $scope.selectedCalendar.calendar.id);
        console.log("event id ", $scope.game.selectedGame.id);
        GApi.executeAuth('calendar', 'events.get', {
            calendarId: $scope.selectedCalendar.calendar.id,
            eventId: $scope.game.selectedGame.id
        }).then(
            function (resp) {
                console.log("the event to add invites? ", resp);
                $scope.game.retrievedGame = resp;

                $scope.managerService.retrieveTeam().then(function () {
                        $scope.game.rosterArray = $scope.managerService.displayTeam();

                        for(var i = 0; i<$scope.game.rosterArray.length; i++){
                            //console.log("rosterArray", $scope.game.rosterArray);
                            if($scope.game.rosterArray[i].type == "sub"){
                                $scope.game.subEmails.push({email:$scope.game.rosterArray[i].email});
                                $scope.game.retrievedGame.attendees.push({email:$scope.game.rosterArray[i].email});

                            }
                            //$scope.game.rosterEmails.push({email:$scope.game.rosterArray[i].email})
                        }
                        //console.log("sub emails ", $scope.game.subEmails);
                        //console.log("retrievedGame attendees, ",$scope.game.retrievedGame.attendees);
                        $scope.updatedEvent = {
                            calendarId: $scope.selectedCalendar.calendar.id,
                            eventId: $scope.game.selectedGame.id,
                            sendNotifications: true,
                            resource: {
                                summary: 'Game',
                                description: "inviting subs",
                                start:{
                                    dateTime: $scope.game.retrievedGame.start.dateTime
                                },
                                end: {
                                    dateTime: $scope.game.retrievedGame.end.dateTime
                                },
                                attendees: $scope.game.retrievedGame.attendees,
                                location:$scope.game.retrievedGame.location
                            }
                        };

                        //console.log("updatedEvent ", $scope.updatedEvent);

                        GApi.executeAuth("calendar", "events.update", $scope.updatedEvent).then(function(resp){
                            //console.log(resp);
                            $scope.getEvents($scope.selectedCalendar.calendar);
                            //$scope.getAttendance($scope.selectedCalendar.calendar);
                        }, function(){
                            console.log("error updating");
                        });

                    }, function () {
                        console.log("error getting");
                    }
                );
            });
    };

    $scope.getCalendars();

}]);
///////////////////////////
//ROSTER CONTROLLER//
//////////////////////////
myApp.controller("inputTeamController", ["$scope", "$http", "ManagerService", "GAuth", function($scope, $http, ManagerService, GAuth){
    $scope.newPlayer = {};
    $scope.newPlayer.type = "player";
    $scope.playerArray = [];
    $scope.gridOptions = {};
    $scope.managerService = ManagerService;
    $scope.settings = [];
    $scope.ready = {
        roster: false
    };
    //console.log("here we are", GAuth.offline().getCode());
    //grantOfflineAccess({'redirect_uri': 'postmessage'}).then($scope.signInCallback))
    //GAuth.auth2().grantOfflineAccess({'redirect_uri': 'postmessage'}).then($scope.signInCallback);


    $scope.gridOptions = {
        columnDefs: [
            {field: "name", name: "Name"},
            {field: "email", name:"Email"},
            {field: "type", name:"Type"},
            {name: 'delete', displayName: 'Delete', cellTemplate: '<button id="deleteBtn" type="button" ' +
            'class="btn-small" ng-click="grid.appScope.deletePlayer(row.entity)">Delete</button> '}
        ]
    };


    $scope.inputPlayer = function(newPlayer){
        console.log("newPLayer ",newPlayer);
        $http.post('/team/roster', newPlayer).then(function(response){
            console.log("teh response ",response);
            $scope.refreshGrid();
        });
    };

    $scope.refreshGrid = function(){
        $scope.managerService.retrieveTeam().then(function() {
            $scope.playerArray = $scope.managerService.displayTeam();
            $scope.gridOptions.data = $scope.playerArray;
            console.log($scope.playerArray);
        });
    };
    $scope.deletePlayer= function(row){
        console.log(row);
        $http.post('/team/delete', row).then(function(response){
            console.log(response);
            $scope.refreshGrid();
        });
    };

    $scope.editPlayer = function(row){
      console.log(row);
    };

    $scope.rosterComplete = function(){
        $scope.ready.roster = true;
        $scope.managerService.inputSetting($scope.ready);
        $scope.settings = $scope.managerService.retrieveSetting();
        console.log("scope.settings in the roster, ",$scope.settings);
    };


    $scope.refreshGrid();

}]);
///////////////////////////////
//SCHEDULE CONTROLLER////////////
/////////////////////////////////
myApp.controller("inputScheduleController", ["$scope", "$http", 'GApi','moment', 'ManagerService',"$filter", "uiGridConstants",
    function($scope, $http, GApi, moment, ManagerService, $filter, uiGridConstants){

    $scope.gridOptions = {};
    $scope.newGame = {};
    $scope.newCalendar = {};
    $scope.currentCalendars = {};
    $scope.managerService = ManagerService;
    $scope.playerArray = [];
    $scope.playerEmails = [];
    $scope.selectedCalendar = {};
    $scope.settings = [];
    $scope.ready = {
        schedule: false
    };

    $scope.gridOptions = {
        columnDefs: [
            {field: "start.dateTime", visible: false, sort: {direction: uiGridConstants.ASC,
                priority: 0}
            },
            {field: "summary", name: "Event"},
            {field: "display_date", name: "Date"},
            {field: "display_start", name: "Time"},
            {field: "location", name: "Location"},
            {name: 'delete', displayName: 'Delete', cellTemplate: '<button id="deleteBtn" type="button" ' +
            'class="btn-small" ng-click="grid.appScope.deleteEvent(row.entity)">Delete</button> '}
        ]
    };

    $scope.event = {
        //calendarId: 'vmte39c86sbcmh9fqr58iglsuo@group.calendar.google.com',
        summary: 'Game',
        sendNotifications: true,
        description: "a test",
        start: {
            dateTime: '2015-12-11T22:00:00Z'
        },
        'end': {
            'dateTime': '2015-12-11T23:00:00Z'
        },
        'attendees': [
            {'email': 'pazimmel@gmail.com'},
            {'email': 'stephbealee@gmail.com'}
        ]
    };

    $scope.getEmailAddresses = function(){
        $scope.managerService.retrieveTeam().then(function() {
            $scope.playerArray = $scope.managerService.displayTeam();
            //console.log($scope.playerArray);
            for(var i =0; i<$scope.playerArray.length; i++){
                //console.log($scope.playerArray[i].email);
                if ($scope.playerArray[i].type === "player"){
                    $scope.playerEmails.push({email: $scope.playerArray[i].email});
                }


            }
        });
    };
    $scope.getCalendars = function(){
        $scope.managerService.retrieveCalendar().then(function(){
            $scope.currentCalendars = $scope.managerService.displayCalendar();
            //console.log("result from getCalendars, ",$scope.currentCalendars);
            //console.log("currentCalendars id, ", $scope.currentCalendars[0].id);
            return $scope.currentCalendars;
        });
    };

    $scope.getEvents = function(calendar){
        GApi.executeAuth('calendar', 'events.list', {calendarId: calendar.id}).then(function(resp){
            //console.log("resp.items ",resp.items);

            //console.log("calendar.calendarID, ",$scope.selectedCalendar.calendarId);
            //console.log("calendar.calendar.id, ",$scope.selectedCalendar.calendar.id);
            $scope.managerService.setCalendarId($scope.selectedCalendar.calendar.id);
            //console.log("in the managerService, ",$scope.managerService.getCalendarId());
            $scope.gridOptions.data = resp.items;

            for(var i =0;i<$scope.gridOptions.data.length;i++){
                //$scope.gridOptions.data[i].date = $filter('date')($scope.gridOptions.data[i].start.dateTime,'EEE, MMM d');
                //$scope.gridOptions.data[i].start = $filter('date')($scope.gridOptions.data[i].start.dateTime,'shortTime');
                $scope.gridOptions.data[i].display_date = $filter('date')($scope.gridOptions.data[i].start.dateTime,'EEEE, MMM d');
                $scope.gridOptions.data[i].display_start = $filter('date')($scope.gridOptions.data[i].start.dateTime,'shortTime');
            }

            //$filter('date')($scope.gridOptions.data.start.dateTime, "mediumTime");
            //console.log("gridpOptions.data ",$scope.gridOptions.data);
            return $scope.gridOptions.data;
        });
    };
    $scope.createCalendar = function(){
        GApi.executeAuth('calendar', 'calendars.insert', $scope.newCalendar).then(function(resp){
            console.log("response from createCalendar, ",resp);
            $scope.newCalendar.id = resp.id;
            console.log($scope.newCalendar);
            $scope.inputCalendar();
            $scope.getCalendars();
            return $scope.newCalendar;
        }, function(){
            console.log("error");
        });

    };

    $scope.inputCalendar = function(){
      $http.post('/team/calendar', $scope.newCalendar).then(function(resp){
          console.log("response from inputCalendar, ",resp);
          //$scope.getCalendars();
          return $scope.newCalendar;
      });
    };

    $scope.inputGame = function(game){
            console.log("currentCalendarsid in inputGame ", $scope.currentCalendars.id);

        if(!$scope.selectedCalendar.calendar){
                $scope.event.calendarId = $scope.currentCalendars[0].id;
            } else {
                $scope.event.calendarId = $scope.selectedCalendar.calendar.id
            }

            $scope.event.attendees = $scope.playerEmails;
            //$scope.newGame.end = $scope.newGame.start;
            //console.log(newGame.date);
            $scope.event.location = $scope.newGame.location;
            $scope.event.start.dateTime = $scope.newGame.date;
            $scope.event.end.dateTime = moment($scope.newGame.date).add(1, 'hours');
            //$scope.event.end.dateTime = moment().add(1, 'hours');
            console.log($scope.event);

            GApi.executeAuth('calendar', 'events.insert', $scope.event).then(function(resp) {
                $scope.value = resp;
                $scope.getEvents($scope.selectedCalendar.calendar);
                return game;
            }, function() {
                console.log("error :(");
            });


        };

    $scope.deleteEvent = function(row){
        console.log(row);
        $scope.delEvent = {
            calendarId: $scope.selectedCalendar.calendar.id,
            eventId: row.id
        };
        GApi.executeAuth("calendar", "events.delete", $scope.delEvent).then(function(response){
            console.log(response);
            $scope.getEvents($scope.selectedCalendar.calendar);
            return response;
        }, function(){
            console.log("error");
        });

    };

    $scope.scheduleComplete = function(){
      $scope.ready.schedule = true;
        $scope.managerService.inputSetting($scope.ready);
        $scope.settings = $scope.managerService.retrieveSetting();
        console.log("scope.settings in the schedule, ",$scope.settings);
    };

    $scope.getCalendars();
    $scope.getEmailAddresses();

    //$scope.gridOptions.data = $scope.selectedCalendar.calendar;
    //$scope.gridOptions.data = selectedCalendar.calendar;

//    $scope.inputGame = function(game){
//        console.log(game.date);
//        gapi.load('auth2', function() {
////                auth2 = gapi.getAuthInstance({
//            auth2 = gapi.auth2.init({
//                client_id: '1014545251900-anab20hkgicb30gpsgu7q7vb47pnr326.apps.googleusercontent.com',
//                // Scopes to request in addition to 'profile' and 'email'
//                scope: 'https://www.googleapis.com/auth/calendar'
////                    callbackUrl: "http://www.localhost5000/playerAttendance"
//            });
//        });
//        gapi.client.load('calendar', 'v3', $scope.createNewEvent(game));
//
//    };
//    $scope.createNewEvent = function() {
//        console.log("in create new event");
//        var request = gapi.client.calendar.events.insert({
//            calendarId: 'vmte39c86sbcmh9fqr58iglsuo@group.calendar.google.com',
//            resource: $scope.event
//        });
//        request.execute.then(function(event) {
//            console.log("event created? ", event);
//        });
//    };


}]);
////////////////////////////////
//EMAIL SETTINGS CONTROLLER//
//////////////////
myApp.controller("inputEmailSettingsController", ["$scope", "$http", "$window", "ManagerService", "GApi", function($scope, $http, $window, ManagerService, GApi){
    $scope.settings = [];
    $scope.ready = {
        email:false
    };
    $scope.days = [0,1,2,3,4,5];
    $scope.reminders = {
        first_reminder: 5,
        second_reminder: 2,
        attendance_reminder: 2
    };
    $scope.calendarSettings = {};
    //$scope.emailTeam = [
    //    {name: "Team", type: "team"},
    //    {name: "Players", type: "player"},
    //    {name: "Subs", type: "sub"}
    //];
    //$scope.email = {};
    $scope.managerService = ManagerService;

    //$scope.emailSelected = function(selection){
    //    //console.log(selection.type);
    //    $scope.managerService.retrieveTeam().then(function() {
    //        $scope.email.playerArray = $scope.managerService.displayTeam();
    //        $scope.email.type = selection.type;
    //        $scope.filterPlayerEmails(selection.type);
    //    });
    //};
    //$scope.filterPlayerEmails = function(type){
    //    $scope.email.selected = [];
    //    for (var i = 0; i<$scope.email.playerArray.length; i++){
    //        if(type === "team"){
    //            $scope.email.selected.push($scope.email.playerArray[i].email);
    //        } else if($scope.email.playerArray[i].type === type) {
    //            $scope.email.selected.push($scope.email.playerArray[i].email);
    //        }
    //    }
    //    console.log($scope.email.selected);
    //};
    //$scope.writeEmail = function(addresses){
    //    GApi.executeAuth("email, ")
    //};
    $scope.inputEmailSettings= function(settings){
        $scope.calendarSettings = settings;
        $scope.calendarSettings.calendarId = $scope.managerService.getCalendarId();
        console.log($scope.calendarSettings);
        $scope.updateEmailSettings();

        $scope.emailSettingsComplete();
        console.log("end of emailSettings");
    };
    $scope.getEmailSettings = function(){
        $http.get("team/reminder/init").then(function(resp){
            console.log(resp.data[0]);

            if (!resp.data[0]){
                $scope.initEmailSettings($scope.reminders);
            } else {
                $scope.reminders = resp.data[0];
            }



        });
    };
    $scope.initEmailSettings = function(settings){
        $scope.calendarSettings = settings;
        console.log("the settings ",settings);
        console.log("managerService.getCalendarId ",$scope.managerService.getCalendarId());
        $scope.calendarSettings.calendarId = $scope.managerService.getCalendarId();
        $http.post('/team/reminder/init', $scope.calendarSettings).then(function(resp){
            console.log("initializing the email settings, ",resp);
            //$scope.setOfflineAccess();
            return $scope.calendarSettings;
        },function(){
            console.log("error");
        });
    };
    $scope.updateEmailSettings = function(){
        $http.post('/team/reminder/update', $scope.calendarSettings).then(function(resp) {
            console.log("email settings updated :", resp);
            return $scope.calendarSettings;
        },function(){
            console.log("error");
        });
    };

    $scope.setOfflineAccess = function(){
        console.log("click offlineAccess");
        //if you lose refresh token, need to change approval_prompt to force
        //auth2.grantOfflineAccess({'redirect_uri': 'postmessage', approval_prompt: 'force'}).then($scope.signInCallback);
        auth2.grantOfflineAccess({'redirect_uri': 'postmessage'}).then($scope.signInCallback);
        return true;
    };
    $scope.signInCallback = function(authResult){
        console.log(authResult['code']);
        if (authResult['code']){

            $http({
                url: '/login',
                method: "POST",
                params: {code: authResult['code']}
            }).then(
                function(response){
                    console.log(response);
                    return response;
                }
            )
        } else {
            console.log("there was an error");
            return false;
        }
    };
    $scope.emailSettingsComplete = function(){
        $scope.ready.email = true;
        $scope.managerService.inputSetting($scope.ready);
        $scope.settings = $scope.managerService.retrieveSetting();
        console.log("scope.settings in the email, ",$scope.settings)
    };
    $scope.startSeason = function() {
        $scope.settings = $scope.managerService.retrieveSetting();
        console.log($scope.settings);
        if($scope.settings.length<3){
            $window.alert("Hey there! You haven't completed setting up. Make sure you have clicked the appropriate 'Complete' button on each page");
        }
    };
    $scope.getEmailSettings();
    //$scope.initEmailSettings($scope.reminders);
}]);

    //$scope.testSchedule = function() {
    //    $http.get('/test').then(function(response){
    //        console.log(response);
    //    })
    //};
    //$scope.manager = {};
    //
    //$scope.CLIENT_ID = '1014545251900-anab20hkgicb30gpsgu7q7vb47pnr326.apps.googleusercontent.com';
    //
    //
    //$scope.SCOPES = ["https://www.googleapis.com/auth/calendar"];
    //
    ///**
    // * Check if current user has authorized this application.
    // */
    //$scope.checkAuth = function() {
    //    gapi.auth.authorize(
    //        {
    //            'client_id': CLIENT_ID,
    //            'scope': SCOPES.join(' '),
    //            'immediate': true
    //        }, $scope.handleAuthResult);
    //};
    //
    ///**
    // * Handle response from authorization server.
    // *
    // * @param {Object} authResult Authorization result.
    // */
    //$scope.handleAuthResult= function(authResult) {
    //    $scope.authorizeDiv = {};
    //    if (authResult && !authResult.error) {
    //        // Hide auth UI, then load client library.
    //
    //        $scope.loadCalendarApi();
    //    } else {
    //        // Show auth UI, allowing the user to initiate authorization by
    //        // clicking authorize button.
    //        authorizeDiv.style.display = 'inline';
    //    }
    //};
    //
    ///**
    // * Initiate auth flow in response to user clicking authorize button.
    // *
    // * @param {Event} event Button click event.
    // */
    //function handleAuthClick(event) {
    //    gapi.auth.authorize(
    //        {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    //        handleAuthResult);
    //    return false;
    //}
    //
    ///**
    // * Load Google Calendar client library. List upcoming events
    // * once client library is loaded.
    // */
    //function loadCalendarApi() {
    //    gapi.client.load('calendar', 'v3', listUpcomingEvents);
    //    console.log(listUpcomingEvents);
    //}
    //$scope.userLogin = function(managerObject){
    //    console.log(managerObject);
    //};


////Don't forget to look at this!!!!!!//////
//var encodedMail = btoa(
//    "Content-Type: text/plain; charset=\"UTF-8\"\n" +
//    "MIME-Version: 1.0\n" +
//    "Content-Transfer-Encoding: 7bit\n" +
//    "Subject: Subject of the mail\n" +
//    "From: sender@gmail.com\n" +
//    "To: reciever@gmail.com\n\n" +
//
//    "This is where the mail text will go"
//).replace(/\+/g, '-').replace(/\//g, '_');