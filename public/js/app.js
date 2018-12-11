var app = angular.module('myApp', ['ngRoute']);

app.factory('userService', ['$http', function($http) {
    var service = {
        getUsers: function() {
            return $http.get('/users');
        },
        addUser: function(url, user) {
            return $http.post(url, user);
        }
    };
    return service;
}]);

app.controller('userController', ['$scope', 'userService', function($scope, userService) {
    var promise = userService.getUsers();
    promise.then(function(response) {
        $scope.users = response.data;
        // console.log(JSON.stringify($scope.users));
    }, function(response) {
        console.log('Response in Error: ' + response);
    });

    $scope.user = {};

    $scope.addUsers = function() {
        var url = '/users';
        var promise = userService.addUser(url, $scope.user);
        promise.then(function(response) {
            if (response.status === 201) {
                console.log('Resource created!');
            } else {
                console.log('Error while creating resource');
            }
        }, function(response) {
            alert('Error while creating resource');
        });
    };
}]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/users/list', {
        templateUrl: '/html/users.html',
        controller: 'userController'
    }).when('/users/add', {
        templateUrl: '/html/new.html',
        controller: 'userController'
    });
}]);