angular.module('espacoVC').directive('buildingStatus', function() {
  return {
  	restrict: 'E',
  	scope:{ data: '=data' },
    templateUrl: 'directives/building-status/building-status.html',
    controller: function ($scope, myService){
    	$scope.max = 100;
    	$scope.current = 50;
    	$scope.color = '#a10f1c';

      console.log($scope.data);
    }
  };
});
