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
	$scope.jobs = {stableJobs:[], abortedJobs: [], failedJobs:[], disabled:[], unknownJobs:[]};
	var currInterval = null;
	$scope.$on('$destroy', function (){
		if (currInterval) {
			$interval.cancel(currInterval);
		}
	});
	
	var poll = function() {
		if (angular.isDefined($routeParams.project)) {
			currInterval = $interval(function() {
				getProjectData();
			}, 5000);
		}
	};

	var getPercentCompletion = function(build) {
		var now = Date.now();
		var timestamp = build.timestamp;
		var estimatedDuration = build.estimatedDuration;
		return 100*(now - timestamp)/estimatedDuration < 100 ? 100*(now - timestamp)/estimatedDuration : 100;
	};

	var getProjectData = function() {
		var url = '/view/:project/api/json?depth=2';
		if (!$routeParams.project) {
			return;
		}
		$http.get(url.replace(':project', $routeParams.project), {cache:false}).success(function(response) {
			var jobs = {stableJobs:[], abortedJobs: [], failedJobs:[], disabledJobs:[], unknownJobs:[]};
			angular.forEach(response.jobs, function(job) {
				if (job.color.indexOf('blue') === 0 || job.color.indexOf('yellow') === 0) {
					jobs.stableJobs.push(job);
				} else if (job.color.indexOf('aborted') === 0) {
					jobs.abortedJobs.push(job);
				} else if (job.color.indexOf('red') === 0) {
					jobs.failedJobs.push(job);
				} else if (job.color.indexOf('disabled') === 0) {
					job.color = 'disabledJob';
					jobs.disabledJobs.push(job);
				} else {
					jobs.unknownJobs.push(job);
				}
				if (job.color.indexOf('_anime') > 1) {
					job.inprogress = true;
					job.percentCompleted = getPercentCompletion(job.builds[0]);
				} else {
					job.inprogress = false;
					job.percentCompleted = '';
				}
			});
			$scope.jobs = jobs;
		});
	};

	getProjectData();
	poll();
});