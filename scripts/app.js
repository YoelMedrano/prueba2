'use strict';

angular.module('angularRestfulAuth', [
    'ngStorage',
    'ngRoute',
    'angular-loading-bar'
])
.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

    $routeProvider.
        when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        }).
        when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'HomeCtrl'
        }).
        when('/registration', {
            templateUrl: 'partials/registro.html',
            controller: 'HomeCtrl'
        }).
        when('/userprofile', {
            templateUrl: 'partials/userperfil.html',
            controller: 'HomeCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });

    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);

    }
]);
