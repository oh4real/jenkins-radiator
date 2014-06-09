'use strict';
/**
 * @ngdoc overview
 * @name bvRadiatorApp
 * @description
 * # bvRadiatorApp
 *
 * Main module of the application.
 */
angular.module('bvRadiatorApp', [
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch'
]).config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/radiator/:project', {
      templateUrl: 'partials/radiator.html',
      controller: 'RadiatorController'
    }).otherwise({ redirectTo: '/radiator/All' });
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name bvRadiatorApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bvRadiatorApp
 */
angular.module('bvRadiatorApp').controller('RadiatorController', [
  '$scope',
  '$routeParams',
  '$interval',
  '$http',
  function ($scope, $routeParams, $interval, $http) {
    $scope.project = $routeParams.project;
    $scope.jobs = {
      successJobs: [],
      failedJobs: [],
      disabled: [],
      unknownJobs: []
    };
    var currInterval = null;
    $scope.$on('$destroy', function () {
      if (currInterval) {
        $interval.cancel(currInterval);
      }
    });
    var poll = function () {
      if ($routeParams.project !== undefined) {
        currInterval = $interval(function () {
          getProjectData();
        }, 5000);
      }
    };
    var getProjectData = function () {
      var url = '/view/:project/api/json?depth=1';
      if (!$routeParams.project) {
        return;
      }
      $http.get(url.replace(':project', $routeParams.project), { cache: false }).success(function (response) {
        var jobs = {
            successJobs: [],
            failedJobs: [],
            disabledJobs: [],
            unknownJobs: []
          };
        angular.forEach(response.jobs, function (job) {
          if (job.color.indexOf('blue') === 0) {
            jobs.successJobs.push(job);
          } else if (job.color.indexOf('red') === 0) {
            jobs.failedJobs.push(job);
          } else if (job.color.indexOf('disabled') === 0) {
            job.color = 'disabledJob';
            jobs.disabledJobs.push(job);
          } else {
            jobs.unknownJobs.push(job);
          }
        });
        $scope.jobs = jobs;
      });
    };
    getProjectData();
    poll();
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name bvRadiatorApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bvRadiatorApp
 */
angular.module('bvRadiatorApp').directive('jenkinsViewMenu', function () {
  var directiveDefinitionObject = {};
  directiveDefinitionObject.templateUrl = 'partials/jenkins-view-menu.html';
  directiveDefinitionObject.controller = function ($scope, $http, $location) {
    $scope.views = [];
    $http.get('/api/json').success(function (response) {
      angular.forEach(response.views, function (view) {
        var project = view.url.match(/\/view\/(.*)\/$/);
        if (project) {
          view.project = project[1];
          $scope.views.push(view);
        }
      });
    });
    $scope.goToView = function () {
      var view = '/radiator/' + $scope.selectedView.project;
      $location.path(view);
    };
  };
  directiveDefinitionObject.scope = {};
  return directiveDefinitionObject;
});