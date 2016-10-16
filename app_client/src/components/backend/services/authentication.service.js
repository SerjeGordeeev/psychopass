
  angular
    .module('psApp')
    .service('authentication', authentication)

  authentication.$inject = ['$http', '$window']
  function authentication ($http, $window) {
    let vm = this
    vm.roleAssoc = {
      psycholog: 'Психолог',
      admin: 'Администратор',
      org: 'Организатор',
      student: 'Участник'
    }

    vm.crudRights = ['admin', 'org']


    var roleTitle = function(role){
      if(role){
        return vm.roleAssoc[role]
      }
      else{
        return vm.roleAssoc
      }
    }
    
    var saveToken = function (token) {
      $window.localStorage['mean-token'] = token
    }
    
    var getToken = function () {
      return $window.localStorage['mean-token']
    }
    
    var isLoggedIn = function() {
      var token = getToken()
      var payload
    
      if(token){
        
        payload = token.split('.')[1]
        payload = $window.atob(payload)
        payload = JSON.parse(payload)
    
        return payload.exp > Date.now() / 1000
      } else {
        return false
      }
    }
    
    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken()
        var payload = token.split('.')[1]
        
        payload = $window.atob(payload)

        payload = JSON.parse(payload)
        //console.log(payload)
        return {
          email : payload.email,
          name : decodeURIComponent(escape(payload.name)),
          role: payload.role,
          organisation: payload.organisation
        }
      }
    }
    
    var register = function(user) {
      return $http.post('/api/register', user).success(function(data){
        saveToken(data.token)
      })
    }
    
    var login = function(user) {
      return $http.post('/api/login', user).success(function(data) {
        saveToken(data.token)
      })
    }
    
    var logout = function() {
      $window.localStorage.removeItem('mean-token')
    }

    function checkCRUDRights(){
      let userRole = currentUser().role
      return vm.crudRights.includes(userRole)
    }
    
    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      logout : logout,
      roleTitle : roleTitle,
      checkCRUDRights: checkCRUDRights
    }
  }
