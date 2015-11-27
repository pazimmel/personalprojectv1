myApp.controller("loginController", ["$scope", "$http", function($scope, $http){

    $scope.googleLogin = function(){
        console.log("click");
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
myApp.controller("attendanceController", ["$scope", "$http", function($scope, $http){

}]);
myApp.controller("inputTeamController", ["$scope", "$http", "ManagerService", function($scope, $http, ManagerService){
    $scope.newPlayer = {};
    $scope.playerArray = [];
    $scope.gridOptions = {};
    $scope.managerService = ManagerService;

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
myApp.controller("inputScheduleController", ["$scope", "$http", function($scope, $http){

}]);
myApp.controller("inputEmailSettingsController", ["$scope", "$http", function($scope, $http){
    $scope.days = [0,1,2,3,4,5];
    $scope.reminders = {
        team_first: 5,
        team_second: 2,
        attendance: 2
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
