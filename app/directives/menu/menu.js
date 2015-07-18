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
