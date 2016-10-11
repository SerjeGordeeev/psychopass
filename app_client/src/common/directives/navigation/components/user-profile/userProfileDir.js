
  angular
    .module('psApp')
    .directive('userProfile', userProfile);
  
  require('./user_profile.scss')
  function userProfile () {
    return {
      restrict: 'E',
      template: require('./userProfile.html'),
      controller: 'userProfileCtrl',
      controllerAs: 'vm'
    }
  }
