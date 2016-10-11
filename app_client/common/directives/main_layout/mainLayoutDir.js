
  angular
    .module('psApp')
    .directive('mainLayout', mainLayout);

  function mainLayout () {
    return {
      restrict: 'E',
      templateUrl: '/common/directives/main_layout/mainLayout.html',
      controller: 'mainLayoutCtrl',
      controllerAs: 'vm',
      scope: {}
    }
  }
