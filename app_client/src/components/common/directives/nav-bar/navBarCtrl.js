
  angular
    .module('psApp')
    .controller('navBarCtrl', navBarCtrl);

  navBarCtrl.$inject = ['$location','authentication'];
  function navBarCtrl($location, authentication) {
    var vm = this;

  }
