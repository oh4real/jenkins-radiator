'use strict';

/**
 * @ngdoc function
 * @name bvRadiatorApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bvRadiatorApp
 */
angular.module('bvRadiatorApp')
	.directive('jenkinsViewMenu', function() {
		var directiveDefinitionObject = {};
		directiveDefinitionObject.templateUrl = 'partials/jenkins-view-menu.html';
		directiveDefinitionObject.controller = ['$scope', '$http', '$location', function($scope, $http, $location) {
			$scope.views = [];
			$http.get('/api/json').success(function(response) {
				angular.forEach(response.views, function(view) {
					var project = view.url.match(/\/view\/(.*)\/$/);
					if (project) {
						view.project = project[1];
						$scope.views.push(view);
					}
				});
			});
			
			$scope.goToView = function() {
				var view = '/radiator/' + $scope.selectedView.project;
				$location.path(view);
			};
		}];
		directiveDefinitionObject.scope = {};
		return directiveDefinitionObject;
	});