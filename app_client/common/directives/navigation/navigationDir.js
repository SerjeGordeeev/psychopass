
  angular
    .module('psApp')
    .directive('navigation', navigation)

  function navigation () {
    return {
      restrict: 'E',
      template: require('./navigation.html'),
      controller: 'navigationCtrl as navvm'
    }
  }
