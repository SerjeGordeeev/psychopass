
  angular
    .module('psApp')
    .controller('toolBarCtrl', toolBarCtrl)

  toolBarCtrl.$inject = ['$scope','$location','authentication']
  function toolBarCtrl($scope, $location, authentication) {
    var vm = this
    //vm.filters  = $scope.filters
    console.log($scope.filters)

  }
