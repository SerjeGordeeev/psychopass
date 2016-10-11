
  angular
    .module('psApp')
    .controller('topMenuCtrl', topMenuCtrl);

  userProfileCtrl.$inject = ['authentication'];

  function topMenuCtrl(authentication) {
    var vm = this;

    vm.user = authentication.currentUser()

    vm.accessPages = [
      {
        href:'/groups',
        access: ['admin','psycholog', 'org']
      },
      {
        href:'/groups',
        access: ['admin','psycholog', 'org']
      }
    ]

    console.log('topMenu')

  }
