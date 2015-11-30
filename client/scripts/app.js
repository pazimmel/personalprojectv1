var myApp = angular.module("myApp", ['ngRoute', 'ui.grid', 'ui.grid.edit','angular-google-gapi', 'angularMoment']);

myApp.run(['GAuth', 'GApi', "$location",
    function(GAuth, GApi, $location) {

        var CLIENT = '1014545251900-anab20hkgicb30gpsgu7q7vb47pnr326.apps.googleusercontent.com';
        //var BASE = 'https://myGoogleAppEngine.appspot.com/_ah/api';

        GAuth.setClient(CLIENT);
        GApi.load('calendar', 'v3');
        //GAuth.setClient(CLIENT);
        GAuth.setScope('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar');
        //GAuth.auth2();


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

    }]);

myApp.config(['$routeProvider', function ($routeProvider) {
    //$routeProvider
    //    .otherwise('/login');
    //googleClientProvider
    //    //.loadPickerLibrary()
    //    .loadGoogleAuth({
    //        cookie_policy: 'single_host_origin',
    //        //hosted_domain: 'http://localhost:5000',
    //        fetch_basic_profile: true
    //    })
        //.setClientId('1014545251900-anab20hkgicb30gpsgu7q7vb47pnr326.apps.googleusercontent.com')
        //.addScope('https://www.googleapis.com/auth/calendar');
        //.addScope('another scope')
        //.addApi('myApi', 'v1', 'https://app-id.appspot.com/_ah/api')
        //.addApi('oauth2', 'v2');
    //$stateProvider
    //    .state('login', {
    //        url: "/login",
    //        views: {
    //            '': {
    //                templateUrl: "assets/views/routes/login.html",
    //                controller: "loginController"
    //            }
    //        }
    //    })
    //    .state('home', {
    //        url: "/playerAttendance",
    //        views: {
    //            '': {
    //                templateUrl: "assets/views/routes/playerAttendance.html",
    //                controller: "attendanceController"
    //            }
    //        }
    //
    //    });

    $routeProvider
        .when('/login', {
            templateUrl: "assets/views/routes/login.html",
            controller: "loginController"
        })
        .when('/playerAttendance', {
            templateUrl: "assets/views/routes/playerAttendance.html",
            controller: "attendanceController"
        })
        .when('/inputTeam', {
            templateUrl: "assets/views/routes/inputTeam.html",
            controller: "inputTeamController"
        })
        .when('/inputSchedule', {
            templateUrl: "assets/views/routes/inputSchedule.html",
            controller: "inputScheduleController"
        })
        .when('/inputEmailSettings', {
            templateUrl: "assets/views/routes/inputEmailSettings.html",
            controller: "inputEmailSettingsController"
        })
        .otherwise('/login');
}]);

myApp.service("ManagerService", ["$http", "GApi", function($http,GApi){
    var playerArray, calendarArray, calendarId =undefined;
    var settings = [];

    var getTeam = function(){
        var promise = $http.get('/team/roster').then(function(response){
                console.log(response.data);
                playerArray = response.data;
            });
        return promise;
    };

    var getCalendar = function(){
        var promise = $http.get('/team/calendar').then(function(response){
           console.log(response.data);
            calendarArray = response.data;
        });
        return promise;
    };

    var settingComplete = function(settingObject){
        settings.push(settingObject);
    };

    var teamApi = {

        retrieveTeam: function(){
            return getTeam();
        },
        displayTeam: function(){
            return playerArray;
        },
        retrieveCalendar: function(){
            return getCalendar();
        },
        displayCalendar: function(){
            return calendarArray;
        },
        inputSetting: function(settingObject){
            return settingComplete(settingObject);
        },
        retrieveSetting: function(){
            return settings;
        },
        setCalendarId: function(someid){
            calendarId = someid;
            return calendarId;
        },
        getCalendarId: function(){
            return calendarId;
        }
    };
    return teamApi;
}]);