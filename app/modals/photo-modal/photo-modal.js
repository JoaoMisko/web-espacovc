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