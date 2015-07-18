angular.module('espacoVC').controller('mainCtrl', function ($scope, myService, vcRequests, $localStorage, $location) {

    var init = function()
    {	
    	//verify if have a session
    	if(!myService.getData().username){
    		$location.path('/login');
    	}
        else{
            $scope.buildingStatus = new Object();
            $scope.buildingStatus.alvenaria  = 0;
            $scope.buildingStatus.dry = 0;
            $scope.buildingStatus.eletrica = 0;
            $scope.buildingStatus.hidraulica = 0;
            $scope.buildingStatus.paint = 0;
            $scope.buildingStatus.total = 0;

        	$scope.allPhotos= {id:"0", name:"Todas as Fotos"};

        	$scope.building=getVCBuildingData();
        	//mini header data
        	$scope.vcHeader="Espaço VC";
        	//page title (passed to the menu to control the main directive and header title)
        	$scope.headerPage="Status";
        	
        	//photo week id
        	//pages
        	$scope.showStatus = true;
        	$scope.showRelatorio = false;
        	$scope.showDetalhes = false;
        }
    };

    $scope.$watch('headerPage', function() {
    	if($scope.headerPage=='Status'){
    		$scope.showStatus = true;
    		$scope.showRelatorio = false;
    		$scope.showDetalhes = false;
    	}
    	if($scope.headerPage=='Relatório Fotográfico'){
    		$scope.showStatus = false;
    		$scope.showRelatorio = true;
    		$scope.showDetalhes = false;
    	}
    	if($scope.headerPage=='Detalhes'){
    		$scope.showStatus = false;
    		$scope.showRelatorio = false;
    		$scope.showDetalhes = true;
    	}
   	});    

    var getBuildingWeeks = function(building){
    	var weeks = [];

    	angular.forEach(building.photos.data,function (photo){
    		weeks.push({id:photo.yearweek, dateInit:photo.startdate, dateFinal:photo.enddate});
    	});

    	//remove items with the same id
    	var temp = new Array();
    	var add = true;

    	for(var i=0;i<weeks.length;i++){
    		for(var j=0;j<temp.length;j++){
    			if(temp[j].id==weeks[i].id){
    				j=temp.length;
    				i++;
    				add = false;
    			} 
    			else
    			{
    				add = true;
    			} 
    		}
    		if(add){
    			temp.push({id:weeks[i].id, dateInit:weeks[i].dateInit, dateFinal:weeks[i].dateFinal});
    		}
    	}

    	weeks = temp;

        return weeks;
    };
	
	var getVCBuildingData = function() {
		var vcBuilding={};

		vcBuilding.allPhotos = $scope.allPhotos;
		vcBuilding.buildingDetails = $scope.buildingDetails;

		vcRequests.getBuilding(myService.getBuild()).success(function (data){
		// vcRequests.getBuild('551175be657f6f74b358ba9c').success(function (data){

			vcBuilding = data.data[0];

            $scope.buildingDetails = new Object();
            $scope.buildingDetails.address = vcBuilding.address;

            var startdate= vcBuilding.startdate.split(' ')[0];
            var enddate= vcBuilding.enddate.split(' ')[0];
            startdate = startdate.split('-')[2] + '/' + startdate.split('-')[1] + '/' + startdate.split('-')[0];
            enddate = enddate.split('-')[2] + '/' + enddate.split('-')[1] + '/' + enddate.split('-')[0];
            $scope.buildingDetails.startdate = startdate;
            $scope.buildingDetails.enddate = enddate;
            $scope.buildingDetails.scope = vcBuilding.scope;
            $scope.buildingDetails.contactcom = vcBuilding.contactcom;
            $scope.buildingDetails.contacttech = vcBuilding.contacttech;
            $scope.buildingDetails.code = vcBuilding.code;
            $scope.buildingDetails.city = vcBuilding.city;
            $scope.buildingDetails.state = vcBuilding.state;

			vcRequests.getPhotos(vcBuilding.id).success(function (data){
				vcBuilding.photos = data;

				angular.forEach(vcBuilding.photos.data, function (photo){
					var res = photo.startdate.split(' ');
					photo.startdate = res[0];

					res = photo.enddate.split(' ');
					photo.enddate = res[0];
				});

				vcRequests.getStatus(vcBuilding.id).success(function (data2){
					vcBuilding.buildingStatus = data2;

    				//weeks passed to the menu to render the weeks of the photos
					$scope.weeks = getBuildingWeeks(vcBuilding);
					//photos to the gallery
					$scope.photos = vcBuilding.photos.data;//createPhotosArray($scope.building.photos);
					
			    	$scope.idweek = 0;
                    //buildingStatus Object
                    $scope.buildingStatus = new Object();
                    $scope.buildingStatus.alvenaria  = data2.data[0].alvenaria;
                    $scope.buildingStatus.dry = data2.data[0].dry;
                    $scope.buildingStatus.eletrica = data2.data[0].eletrica;
                    $scope.buildingStatus.hidraulica = data2.data[0].hidraulica;
                    $scope.buildingStatus.paint = data2.data[0].paint;
                    $scope.buildingStatus.total = data2.data[0].total;

					return vcBuilding;

				});
			});
		});
	};

    init();

});