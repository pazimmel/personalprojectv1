var myApp = angular.module("myApp", []);


myApp.controller("managerLogin", ["$scope", "$http", function($scope, $http){

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
}]);