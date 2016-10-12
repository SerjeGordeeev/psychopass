
  angular
    .module('psApp')
    .controller('userProfileCtrl', userProfileCtrl);

  userProfileCtrl.$inject = ['$location','authentication'];
  function userProfileCtrl($location,authentication) {
    var vm = this;

    vm.user = authentication.currentUser()

    vm.roleAssoc = {
        psycholog: "Психолог",
        admin: "Администратор",
        org: "Организатор"
    }

    vm.user.role = vm.roleAssoc[vm.user.role]
    //console.log(vm.user)

    vm.logout = logout
    //console.log('userProfile', authentication.currentUser())

    function logout(){
      authentication.logout()
      $location.path('/')
    }

  }
