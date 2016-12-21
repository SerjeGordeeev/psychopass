
  angular
    .module('psApp')
    .directive('toolBar', toolBar)

  require('./toolBar.scss')
  function toolBar () {
    return {
      restrict: 'E',
      template: require('./toolBar.html'),
      controller: 'toolBarCtrl as tb',
      scope: {
        filters: '='
      },
      transclude: true
    }
  }
