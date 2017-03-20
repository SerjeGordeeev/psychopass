
  angular
    .module('psApp')
    .service('$$export', groups)

  groups.$inject = ['$http']
  function groups ($http) {

    var download = function (query) {
      window.open('/api/reports/' + query)
      //return $http.get('/api/reports/' + query)
    }

    return {
      download
    }

    function generateQueryString(payload){
      let query =''

      for(let param in payload){
        query+=`${param}=${payload[param]}&`
      }
      return query.length?`?${query.slice(0,-1)}`:''
    }
  }
