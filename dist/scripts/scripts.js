'use strict';

/* App Module */

var espacoVC = angular.module('espacoVC', ['ngRoute','ui.bootstrap','ngTouch','ngStorage','angular-svg-round-progress']);

espacoVC.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/main', {templateUrl: 'partials/main/main.html',controller: 'mainCtrl'}).
      when('/admin', {templateUrl: 'partials/admin/admin.html',controller: 'adminCtrl'}).
      when('/login', {templateUrl: 'partials/login/login.html',controller: 'loginCtrl'}).
      when('/buildingmenu', {templateUrl: 'partials/building-menu/building-menu.html',controller: 'buildingMenuCtrl'}).
      otherwise({redirectTo: '/login'});
  }]);

angular.module('espacoVC').controller('adminCtrl', function ($scope, vcRequests) {
	$scope.teste = "teste";	
	
});
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
			if(data.user.admin == 'false')
				$location.path('/buildingmenu');
			else
				$location.path('/admin');
		}).error(function (data){
			$scope.showAlert = true;
			$scope.showSpin = false;
		});
	};

	$scope.tokenLogin();

});
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
angular.module('espacoVC').directive('buildingDetails', function() {
  return {
  	restrict: 'E',
  	scope:{ data: '=data' },
    templateUrl: 'directives/building-details/building-details.html',
    controller: function ($scope, myService){
 
    }
  };
});

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

angular.module('espacoVC').directive('gdImage', function($http) {
	return {
		scope: {
			placeholder: '@',
			url: '@',
			width: '@',
			height: '@'
		},
		restrict: 'E',
		link: function(scope, elem, attrs) {
			attrs.$observe('url', function (val) {
				if (val) {
					var img = document.createElement('img');
					img.style.width = attrs.width;
					img.style.height = attrs.height;
					img.src = 'img/placeholder.png';
					elem.replaceWith(img);
					$http.get('/proxy?url=' + encodeURIComponent(attrs.url), {'headers':{ 'X-Api-Token':'ncdyzh2XBzpTwDbrvUlSVHh22IkPsNxZDE5KSVsL0aBjXaNq1yVv1oYd68SDbrPERCR92RQwLTd8oGWTYYj4kQ=='}})
					.success(function (data, status, headers, config) {
						img.src = 'data:' + headers('Content-Type') + ';base64,' + data;
					})
					.error(function (data, status, headers, config) {
						
					});	
				}
			});
		}
	};
});
angular.module('espacoVC').directive('headerVc', function() {
  return {
  	restrict: 'E',
  	scope:{ data: '=data' },
    templateUrl: 'directives/header/header.html',
    controller: function ($scope, myService){


    }
  };
});

angular.module('espacoVC').directive('headerPage', function() {
  return {
  	restrict: 'E',
  	scope:{ data: '=data' },
    templateUrl: 'directives/header-page/header-page.html',
    controller: function ($scope, myService){


    }
  };
});

angular.module('espacoVC').directive('menuVc', function() {
  return {
  	restrict: 'E',
  	scope:{ weeks: '=weeks', page: '=page' , idweek:'=idweek'},
    templateUrl: 'directives/menu/menu.html',
    controller: function ($scope, myService){
    //$scope.weeks passed as parameter from main.html
    	$scope.allPhotos= {id:0, name:"Todas as Fotos"};

    	$scope.setPageStatus = function(){
    		$scope.page = "Status";
    	};

    	$scope.setPageRelatorio = function(){
    		$scope.page = "Relatório Fotográfico";
    	};

    	$scope.setPageDetalhes = function(){
    		$scope.page = "Detalhes";
    	};

    	$scope.setId = function(id){
    		$scope.idweek = id;
    	}

    	/*jQuery time*/
		$(document).ready(function(){
			$("#accordian h3").click(function(){
				//slide up all the link lists
				$("#accordian ul ul").slideUp();
				//slide down the link list below the h3 clicked - only if its closed
				if(!$(this).next().is(":visible"))
				{
					$(this).next().slideDown();
				}
			})
		})

    }
  };
});

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

angular.module('espacoVC').factory('vcRequests', function($http) {

	var base_url = '/goldark-api/';
	var token = 'ncdyzh2XBzpTwDbrvUlSVHh22IkPsNxZDE5KSVsL0aBjXaNq1yVv1oYd68SDbrPERCR92RQwLTd8oGWTYYj4kQ==';
	var contType = 'application/json;charset=utf-8';
	var accept = 'application/json';

	return{
		getBuildings : function(){
			return $http.get(base_url+'buildings',{
				headers:{
					'Accept' : accept,
					'X-Api-Token': token
				}
			});
		},
		getBuild : function(userid){
			return $http.get(base_url+'buildings',{
				headers:{
					'Accept' : accept,
					'X-Api-Token': token
				},
				params:{'user':userid}
			});
		},
		getBuilding : function(buildId){
			return $http.get(base_url+'buildings',{
				headers:{
					'Accept' : accept,
					'X-Api-Token': token
				},
				params:{'id':buildId}
			});
		},
		login : function(dataObj){
			return $http.post(base_url+'sessions',dataObj,{
				headers:{
					'Accept' : accept,
					'X-Api-Token': token,
					'Content-Type' : contType
				} 
			});
		},
		tokenLogin : function(user, pass){
			return $http.get(base_url+'sessions',{
				headers:{
					'Accept' : accept,
					'X-Api-Token': token
				},
				params:{'username':token, 'password' : pass}
			});
		},
		getPhotos : function(buildid){
			return $http.get(base_url+'photos',{
				headers:{
					'Accept' : accept,
					'X-Api-Token': token
				},
				params:{'building':buildid}
			});
		},
		getStatus : function(buildid){
			return $http.get(base_url+'building_status',{
				headers:{
					'Accept' : accept,
					'X-Api-Token': token
				},
				params:{'building':buildid}
			});
		}
	};
});
angular.module('espacoVC').service('myService', function() {

	var obj = {};
	obj.data = {};
	obj.build = {};

	return{
		setData: function(data){
			obj.data=data;
		},
		getData: function(){
			return obj.data;
		},
		clearData: function(){
			obj.data={};
		},
		setBuild: function(build){
			obj.build=build;
		},
		getBuild: function(){
			return obj.build;
		},
		clearBuild: function(){
			obj.build={};
		}

	};
});
angular.module('espacoVC').controller('photoModalCtrl', function ($scope, $modalInstance, items, index) {

  $scope.items = items;
  $scope.index = index;

  for(var i = 0; i < items.length;i++){
      $scope.items[i].visible = false;
  }
  $scope.items[index].visible = true; 

  $scope.next = function () {
    $scope.items[$scope.index].visible = false;
    if($scope.index == items.length-1){
      $scope.index = 0;
    }
    else{
      $scope.index++;
    }
    $scope.items[$scope.index].visible = true;
  };

  $scope.previous = function () {
    $scope.items[$scope.index].visible = false;
    if($scope.index == '0'){
      $scope.index = items.length-1;
    }
    else{
      $scope.index--;
    }
    $scope.items[$scope.index].visible = true;
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});