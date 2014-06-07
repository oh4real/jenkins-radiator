'use strict';

/**
 * @ngdoc overview
 * @name bvRadiatorApp
 * @description
 * # bvRadiatorApp
 *
 * Main module of the application.
 */
angular
  .module('bvRadiatorApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/radiator/:project', {
        templateUrl: 'views/radiator.html',
        controller: 'RadiatorController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
