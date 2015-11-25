var myApp = angular.module("myApp", ['ngRoute']);

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

//myApp.service("ManagerService", ["$http", function($http){
//
//}]);