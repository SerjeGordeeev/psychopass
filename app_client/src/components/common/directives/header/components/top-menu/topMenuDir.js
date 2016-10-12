
  angular
    .module('psApp')
    .directive('topMenu', topMenu);
  
  require('./top-menu.scss')
  function topMenu () {
    return {
      restrict: 'E',
      template: require('./topMenu.html'),
      controller: 'topMenuCtrl',
      controllerAs: 'tm'
    }
  }
