
  angular
    .module('psApp')
    .service('$$organisations', organisations)

  organisations.$inject = ['$http', 'authentication']
  function organisations ($http, authentication) {
    let pid = authentication.currentUser().pid
    var getList = function () {
      return $http.get('/api/organisations', {

      })
    }

    return {
      getList : getList
    }
  }
