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
        .when('/inputInfo', {
            templateUrl: "assets/views/routes/inputInfo.html",
            controller: "inputController"
        })
        .when('/manageEmail', {
            templateUrl: "assets/views/routes/manageEmail.html",
            controller: "emailController"
        })
        .otherwise('/login');
}]);

