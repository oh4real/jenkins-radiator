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
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/radiator/:project', {
        templateUrl: 'partials/radiator.html',
        controller: 'RadiatorController'
      })
      .otherwise({
        redirectTo: '/radiator/All'
      });
  })
  .run(function($timeout, $window) {
    $timeout(function() {
      $window.location.reload();
    }, 28800 * 1000);
  });
