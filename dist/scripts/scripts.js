"use strict";angular.module("bvRadiatorApp",["ngRoute"]).config(["$routeProvider",function(a){a.when("/radiator/:project",{templateUrl:"partials/radiator.html",controller:"RadiatorController"}).otherwise({redirectTo:"/radiator/All"})}]),angular.module("bvRadiatorApp").controller("RadiatorController",["$scope","$routeParams","$interval","$http",function(a,b,c,d){a.project=b.project,a.jobs={stableJobs:[],failedJobs:[],disabled:[],unknownJobs:[]};var e=null;a.$on("$destroy",function(){e&&c.cancel(e)});var f=function(){angular.isDefined(b.project)&&(e=c(function(){h()},5e3))},g=function(a){var b=Date.now(),c=a.timestamp,d=a.estimatedDuration;return 100>100*(b-c)/d?100*(b-c)/d:100},h=function(){var c="/view/:project/api/json?depth=2";b.project&&d.get(c.replace(":project",b.project),{cache:!1}).success(function(b){var c={stableJobs:[],failedJobs:[],disabledJobs:[],unknownJobs:[]};angular.forEach(b.jobs,function(a){0===a.color.indexOf("blue")||0===a.color.indexOf("yellow")?c.stableJobs.push(a):0===a.color.indexOf("red")?c.failedJobs.push(a):0===a.color.indexOf("disabled")?(a.color="disabledJob",c.disabledJobs.push(a)):c.unknownJobs.push(a),a.color.indexOf("_anime")>1?(a.inprogress=!0,a.percentCompleted=g(a.builds[0])):(a.inprogress=!1,a.percentCompleted="")}),a.jobs=c})};h(),f()}]),angular.module("bvRadiatorApp").directive("jenkinsViewMenu",function(){return{templateUrl:"partials/jenkins-view-menu.html",controller:["$scope","$http","$location",function(a,b,c){a.views=[],b.get("/api/json").success(function(b){angular.forEach(b.views,function(b){var c=b.url.match(/\/view\/(.*)\/$/);c&&(b.project=c[1].replace("%20"," "),a.views.push(b))})}),a.goToView=function(){var b="/radiator/"+a.selectedView.project;c.path(b)}}],scope:{}}});