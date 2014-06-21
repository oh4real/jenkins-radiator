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
  });
