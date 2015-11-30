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

//attendance controller
myApp.controller("attendanceController", ["$scope", "$http", "ManagerService", function($scope, $http, ManagerService){
    $scope.gridOptions1 = {};
    $scope.gridOptions2 = {};
}]);
///////////////////////////
//ROSTER CONTROLLER//
//////////////////////////
myApp.controller("inputTeamController", ["$scope", "$http", "ManagerService", "GAuth", function($scope, $http, ManagerService, GAuth){
    $scope.newPlayer = {};
    $scope.playerArray = [];
    $scope.gridOptions = {};
    $scope.managerService = ManagerService;
    $scope.settings = [];
    $scope.roster = {
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
            {name: 'edit', displayName: 'Edit', cellTemplate: '<button id="editBtn" type="button" class="btn-small" ' +
            'ng-click="grid.appScope.editPlayer(row.entity)" >Edit</button> '},
            {name: 'delete', displayName: 'Delete', cellTemplate: '<button id="deleteBtn" type="button" ' +
            'class="btn-small" ng-click="grid.appScope.deletePlayer(row.entity)">Delete</button> '},
            {field: "_v", visible: false},
            {field: "_id", visible: false},
            {field: "$$hashkey", visible: false}
        ]
    };


    $scope.inputPlayer = function(newPlayer){
        $http.post('/team/roster', newPlayer).then(function(response){
            console.log(response);
            $scope.refreshGrid();
        });
    };

    $scope.refreshGrid = function(){
        $scope.managerService.retrieveTeam().then(function() {
            $scope.playerArray = $scope.managerService.displayTeam();
            $scope.gridOptions.data = $scope.playerArray;
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
        $scope.roster.roster = true;
        $scope.managerService.inputSetting($scope.roster);
        $scope.settings = $scope.managerService.retrieveSetting();
        console.log("scope.settings in the roster, ",$scope.settings);
    };


    $scope.refreshGrid();

}]);
///////////////////////////////
//SCHEDULE CONTROLLER////////////
/////////////////////////////////
myApp.controller("inputScheduleController", ["$scope", "$http", 'GApi','moment', 'ManagerService',"$filter", function($scope, $http, GApi, moment, ManagerService, $filter){
    $scope.gridOptions = {};
    $scope.newGame = {};
    $scope.newCalendar = {};
    $scope.currentCalendars = {};
    $scope.managerService = ManagerService;
    $scope.playerArray = [];
    $scope.playerEmails = [];
    $scope.selectedCalendar = {};
    $scope.settings = [];
    $scope.schedule = {
        schedule: false
    };

    $scope.gridOptions = {
        columnDefs: [
            {field: "summary", name: "Event"},
            {field: "date", name: "Date"},
            {field: "start", name: "Time"},
            {field: "location", name: "Location"}
        ]
    };
    $scope.event = {
        calendarId: 'vmte39c86sbcmh9fqr58iglsuo@group.calendar.google.com',
        summary: 'newGame',
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
                $scope.playerEmails.push({email: $scope.playerArray[i].email});

            }
        });
    };
    $scope.getCalendars = function(){
        $scope.managerService.retrieveCalendar().then(function(){
            $scope.currentCalendars = $scope.managerService.displayCalendar();
            console.log("result from getCalendars, ",$scope.currentCalendars);
            console.log("currentCalendars id, ", $scope.currentCalendars[0].id);
            return $scope.currentCalendars;
        });
    };

    $scope.getEvents = function(calendar){
        GApi.executeAuth('calendar', 'events.list', {calendarId: calendar.id}).then(function(resp){
            console.log("resp.items ",resp.items);
            $scope.gridOptions.data = resp.items;

            for(var i =0;i<$scope.gridOptions.data.length;i++){
                $scope.gridOptions.data[i].date = $filter('date')($scope.gridOptions.data[i].start.dateTime,'EEE, MMM d');
                $scope.gridOptions.data[i].start = $filter('date')($scope.gridOptions.data[i].start.dateTime,'shortTime');
            }

            //$filter('date')($scope.gridOptions.data.start.dateTime, "mediumTime");
            console.log("gridpOptions.data ",$scope.gridOptions.data);
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
            $scope.event.calendarId = $scope.currentCalendars[0].id;
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
                return game;
            }, function() {
                console.log("error :(");
            });

        };

    $scope.scheduleComplete = function(){
      $scope.schedule.schedule = true;
        $scope.managerService.inputSetting($scope.schedule);
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
myApp.controller("inputEmailSettingsController", ["$scope", "$http", "$window", function($scope, $http, $window){
    $scope.settings = [];
    $scope.email = {
        email:false
    };
    $scope.days = [0,1,2,3,4,5];
    $scope.reminders = {
        team_first: 5,
        team_second: 2,
        attendance: 2
    };
    $scope.calendarSettings = {};


    $scope.inputEmailSettings= function(settings){
        $scope.calendarSettings = settings;
        $scope.calendarSettings.calendarId
    };
    $scope.setOfflineAccess = function(){
        console.log("click offlineAccess");
        auth2.grantOfflineAccess({'redirect_uri': 'postmessage'}).then($scope.signInCallback);
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

                }
            )
        } else {
            console.log("there was an error");
        }
    };
    $scope.emailSettingsComplete = function(){
        $scope.email.email = true;
        $scope.managerService.inputSetting($scope.email);
        $scope.settings = $scope.managerService.retrieveSetting();
        console.log("scope.settings in the email, ",$scope.settings)
    };
    $scope.startSeason = function() {
        $scope.settings = $scope.managerService.retrieveSetting();
        console.log(settings);
        if(settings.length<3){
            $window.alert("Hey there! You haven't completed setting up. Make sure you have clicked the appropriate 'Complete' button on each page");
        }
    };


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
