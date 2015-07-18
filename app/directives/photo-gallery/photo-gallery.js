angular.module('espacoVC').directive('photoGallery', function() {
  return {
  	restrict: 'E',
  	scope:{ data: '=data', interval:'=interval', idweek:'=idweek'},
    templateUrl: 'directives/photo-gallery/photo-gallery.html',
    controller: function ($scope, myService, $modal){


	  	$scope.setPhotos = function (id){
	  		if(id == 0){
	  			$scope.photos=$scope.data;
	  		}
	  		else{
	  			$scope.photos=[];
	  			angular.forEach($scope.data, function(photo){
	  				if(photo.yearweek == id){
	  					$scope.photos.push(photo);
	  				}
	  			});
	  		}
	  	};

	  	$scope.setWeek = function(idweek){
	  		$scope.week="Todas as Fotos";
	  		if($scope.photos != "" && $scope.photos != null && $scope.photos != undefined){
		  		for(var i = 0; i<$scope.photos.length;i++){
		  			if($scope.photos[i].yearweek == idweek){
		  				$scope.week = "Semana: "+$scope.photos[i].startdate + " - " + $scope.photos[i].enddate;
		  				return;
		  			}
		  		}
		  	}
	  	};


	  	$scope.$watch('idweek', function() {
       		$scope.setPhotos($scope.idweek);
       		$scope.setWeek($scope.idweek);
   		});    

	  	$scope.open = function (index) {

    		var modalInstance = $modal.open({
		      templateUrl: 'modals/photo-modal/photo-modal.html',
		      controller: 'photoModalCtrl',
		      size: 'lg',
		      resolve: {
		        items: function () {
		          return $scope.photos;
		        },
		        index: function (){
		        	return index;
		        }
		      }
    		});
    	};

    	$scope.setPhotos();

    	// $filter('orderBy')(array, expression, reverse)




    	//implement sort of array

    }
  };
});
