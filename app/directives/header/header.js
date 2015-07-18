angular.module('espacoVC').directive('headerVc', function() {
  return {
  	restrict: 'E',
  	scope:{ data: '=data' },
    templateUrl: 'directives/header/header.html',
    controller: function ($scope, myService){


    }
  };
});
