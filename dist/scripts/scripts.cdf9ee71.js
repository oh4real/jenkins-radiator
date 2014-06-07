"use strict";angular.module("bvRadiatorApp",["ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{template:'<span class="viewMenu" jenkins-view-menu></span>'}).when("/radiator/:project",{templateUrl:"partials/radiator.html",controller:"RadiatorController"}).otherwise({redirectTo:"/"})}]),angular.module("bvRadiatorApp").controller("RadiatorController",["$scope","$routeParams","$interval","$http",function(a,b,c,d){a.project=b.project,a.jobs={successJobs:[],failedJobs:[],disabled:[],unknownJobs:[]};var e=function(){void 0!==b.project&&c(function(){f()},5e3)},f=function(){var c="/view/:project/api/json?depth=1";b.project&&d.get(c.replace(":project",b.project),{cache:!1}).success(function(b){var c={successJobs:[],failedJobs:[],disabledJobs:[],unknownJobs:[]};angular.forEach(b.jobs,function(a){0===a.color.indexOf("blue")?c.successJobs.push(a):0===a.color.indexOf("red")?c.failedJobs.push(a):0===a.color.indexOf("disabled")?(a.color="disabledJob",c.disabledJobs.push(a)):c.unknownJobs.push(a)}),a.jobs=c})};f(),e()}]),angular.module("bvRadiatorApp").directive("jenkinsViewMenu",function(){var a={};return a.templateUrl="partials/jenkins-view-menu.html",a.controller=function(a,b,c){a.views=[],b.get("/api/json").success(function(b){angular.forEach(b.views,function(b){var c=b.url.match(/\/view\/(.*)\/$/);c&&(b.project=c[1],a.views.push(b))})}),a.goToView=function(){var b="/radiator/"+a.selectedView.project;c.path(b)}},a.scope={},a});