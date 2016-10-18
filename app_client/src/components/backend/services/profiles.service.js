
  angular
    .module('psApp')
    .service('$$profiles', profiles)

  profiles.$inject = ['$http']
  function profiles ($http) {

    var getList = function (payload) {
      return $http.get('/api/profiles' + generateQueryString(payload))
    }

    var post = function (payload) {
      return $http.post('/api/profiles', payload)
    }

    var remove = function (payload) {
      return $http.delete('/api/profiles?id=' + payload.id)
    }

    var put = function (payload) {
      if(payload.ids) return $http.put('/api/profiles?ids=' + payload.ids.toString(), payload)
      return $http.put('/api/profiles?id=' + payload.id, payload)
    }

    return {
      getList : getList,
      post: post,
      remove: remove,
      put: put
    }

    function generateQueryString(payload){
      let query =''

      for(let param in payload){
        query+=`${param}=${payload[param]}&`
      }
      return query.length?`?${query.slice(0,-1)}`:''
    }
  }
