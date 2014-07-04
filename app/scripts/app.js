'use strict';

/**
 * @ngdoc overview
 * @name jenkinsRadiatorApp
 * @description
 * # jenkinsRadiatorApp
 *
 * Main module of the application.
 */
angular
    .module('jenkinsRadiatorApp', [
        'ngRoute'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/radiator/:project', {
                templateUrl: 'partials/radiator.html',
                controller: 'RadiatorController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });