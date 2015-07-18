'use strict';

/* App Module */

var espacoVC = angular.module('espacoVC', ['ngRoute','ui.bootstrap','ngTouch','ngStorage','angular-svg-round-progress']);

espacoVC.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/main', {templateUrl: 'partials/main/main.html',controller: 'mainCtrl'}).
      when('/login', {templateUrl: 'partials/login/login.html',controller: 'loginCtrl'}).
      when('/buildingmenu', {templateUrl: 'partials/building-menu/building-menu.html',controller: 'buildingMenuCtrl'}).
      otherwise({redirectTo: '/login'});
  }]);
