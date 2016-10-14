
  angular
    .module('psApp')
    .service('$$groups', groups)

  groups.$inject = ['$http']
  function groups ($http) {

    var getList = function (payload) {
      return $http.get('/api/groups' + generateQueryString(payload))
    }

    var post = function (payload) {
      return $http.post('/api/groups', payload)
    }

    var remove = function (payload) {
      return $http.delete('/api/groups?id=' + payload.id)
    }

    var put = function (payload) {
      return $http.put('/api/groups?id=' + payload.id, payload)
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
