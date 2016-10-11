
  angular
    .module('psApp')
    .directive('navigation', navigation)

  require('./navigation.scss')
  function navigation () {
    return {
      restrict: 'E',
      template: require('./navigation.html'),
      controller: 'navigationCtrl as navvm'
    }
  }
