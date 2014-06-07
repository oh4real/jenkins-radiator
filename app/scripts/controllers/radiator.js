'use strict';

/**
 * @ngdoc function
 * @name bvRadiatorApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bvRadiatorApp
 */
angular.module('bvRadiatorApp')
  .controller('RadiatorController', function ($scope, $routeParams, $interval, $http) {
	$scope.project = $routeParams.project;
	$scope.jobs = {successJobs:[], failedJobs:[], disabled:[], unknownJobs:[]};
	var poll = function() {
		if ($routeParams.project !== undefined) {
			$interval(function() {
				getProjectData();
			}, 5000);
		}
	};
	var getProjectData = function() {
		var url = '/view/:project/api/json?depth=1';
		if (!$routeParams.project) {
			return;
		}
		$http.get(url.replace(':project', $routeParams.project), {cache:false}).success(function(response) {
			var jobs = {successJobs:[], failedJobs:[], disabledJobs:[], unknownJobs:[]};
			angular.forEach(response.jobs, function(job) {
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
});