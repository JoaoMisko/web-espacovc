angular.module('espacoVC').directive('buildingDetails', function() {
  return {
  	restrict: 'E',
  	scope:{ data: '=data' },
    templateUrl: 'directives/building-details/building-details.html',
    controller: function ($scope, myService){
 
    }
  };
});
