angular.module('espacoVC').controller('loginCtrl', function ($scope, myService, vcRequests, $location, $localStorage) {
	$scope.user = "";//"joao@vcengenharia.com.br";
	$scope.pass= "";//"misko11";
	$scope.showAlert = false;
	$scope.showSpin = false;

	$scope.tokenLogin = function (){
		if($localStorage.user){
			$scope.login($localStorage.user,$localStorage.pass);
		}
	};

	$scope.login = function(user, pass){
		//mount the login obj
		$scope.showSpin = true;
		$scope.loginJson = 
		{
			'username':user,
			'password':pass
		};
		//post login data
		vcRequests.login($scope.loginJson).success(function (data){
			//save user info in the service
			myService.setData(data);
			//save to localStorage
			$localStorage.user = $scope.user;
			$localStorage.pass = $scope.pass;
			//redirect to the main page
			$location.path('/buildingmenu');
		}).error(function (data){
			$scope.showAlert = true;
			$scope.showSpin = false;
		});
	};

	$scope.tokenLogin();

});