var myApp = angular.module("myApp", ['ngRoute', 'ui.grid']);

myApp.config(['$routeProvider', function($routeProvider){
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
        //.when('/inputSchedule', {
        //    templateUrl: "assets/views/routes/inputSchedule.html",
        //    controller: "inputScheduleController"
        //})
        //.when('/inputEmailSettings', {
        //    templateUrl: "assets/views/routes/inputEmailSettings.html",
        //    controller: "inputEmailSettings"
        //})
        .otherwise('/login');
}]);

myApp.service("ManagerService", ["$http", function($http){
    var player, playerArray = undefined;

    //var retrieveTeam = function(){
    //    var teamPromise =
    //        $http({
    //            url: '/team',
    //            type: 'GET'
    //        }).then(function(response){
    //            playerArray = response.data;
    //        });
    //    return teamPromise;
    //};

    var teamApi = {

        //retrieveTeam: function(){
        //    retrieveTeam();
        //},
        //displayTeam: function(){
        //    return playerArray;
        //}
    }
}]);