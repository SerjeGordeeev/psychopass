
  angular
    .module('psApp')
    .directive('navBar', navBar)

  require('./nav-bar.scss')
  function navBar () {
    return {
      restrict: 'E',
      template: require('./nav-bar.html'),
      controller: 'navBarCtrl as navb'
    }
  }
