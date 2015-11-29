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

//input team controller
myApp.controller("inputTeamController", ["$scope", "$http", "ManagerService", "GAuth", function($scope, $http, ManagerService, GAuth){
    $scope.newPlayer = {};
    $scope.playerArray = [];
    $scope.gridOptions = {};
    $scope.managerService = ManagerService;

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
        $http.post('/team', newPlayer).then(function(response){
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


    $scope.refreshGrid();

}]);

//input schedule controller
myApp.controller("inputScheduleController", ["$scope", "$http", 'GApi','moment', function($scope, $http, GApi, moment){
    $scope.gridOptions = {};
    $scope.newGame = {};

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
        $scope.inputGame = function(game){

            //$scope.newGame.end = $scope.newGame.start;
            console.log(newGame.date);
            $scope.event.location = $scope.newGame.location;
            $scope.event.start.dateTime = $scope.newGame.date;
            $scope.event.end.dateTime = moment($scope.newGame.date).add(1, 'hours');
            //$scope.event.end.dateTime = moment().add(1, 'hours');
            console.log($scope.event);

            GApi.executeAuth('calendar', 'events.insert', $scope.event).then(function(resp) {
                $scope.value = resp;
            }, function() {
                console.log("error :(");
            });
        };

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

//input email settings controller
myApp.controller("inputEmailSettingsController", ["$scope", "$http", function($scope, $http){
    $scope.days = [0,1,2,3,4,5];
    $scope.reminders = {
        team_first: 5,
        team_second: 2,
        attendance: 2
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
