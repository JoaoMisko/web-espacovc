angular.module('espacoVC').directive('headerPage', function() {
  return {
  	restrict: 'E',
  	scope:{ data: '=data' },
    templateUrl: 'directives/header-page/header-page.html',
    controller: function ($scope, myService){


    }
  };
});
