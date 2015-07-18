angular.module('espacoVC').controller('buildingMenuCtrl', function ($scope, myService, vcRequests, $localStorage, $location) {

	if(!myService.getData().username){
    		$location.path('/login');
    	}
    else{
		vcRequests.getBuild(myService.getData().user_id).success(function (data){
			$scope.buildings = data.data;
		});
	}

	$scope.setBuildingData = function (buildId){
		myService.setBuild(buildId);
		$location.path('/main');
	};

});