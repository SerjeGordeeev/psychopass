
  angular
    .module('psApp')
    .service('$$props', props)

  props.$inject = ['$http']
  function props ($http) {

    var getList = function (payload) {
      return $http.get('/api/props' + generateQueryString(payload))
    }

    var post = function (payload) {
      return $http.post('/api/props', payload)
    }

    var remove = function (payload) {
      return $http.delete('/api/props?id=' + payload.id)
    }

    var put = function (payload) {
      if(payload.ids) return $http.put('/api/props?ids=' + payload.ids.toString(), payload)
      return $http.put('/api/props?id=' + payload.id, payload)
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
