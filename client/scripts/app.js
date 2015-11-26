var myApp = angular.module("myApp", ['ngRoute', 'ui.grid', 'ui.grid.edit']);

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
    var playerArray = undefined;

    var getTeam = function(){
        var promise = $http.get('/team').then(function(response){
                console.log(response.data);
                playerArray = response.data;
            });
        return promise;
    };

    var teamApi = {

        retrieveTeam: function(){
            return getTeam();
        },
        displayTeam: function(){
            return playerArray;
        }
    };
    return teamApi;
}]);