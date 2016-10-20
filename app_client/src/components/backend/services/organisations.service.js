
  angular
    .module('psApp')
    .service('$$organisations', organisations)

  organisations.$inject = ['$http','$$uploader']
  function organisations ($http, $$uploader) {

    var getList = function (payload) {
      return $http.get('/api/organisations' + generateQueryString(payload))
    }

    var post = function (payload) {
      return $http.post('/api/organisations', payload)
    }

    var remove = function (payload) {
      return $http.delete('/api/organisations?id=' + payload.id)
    }

    var put = function (payload) {
      return $http.put('/api/organisations?id=' + payload.id, payload.file)
    }

    var upload = function (file) {
      return $$uploader.upload('/api/organisations/upload', file, null)
    }

    return {
      getList : getList,
      post: post,
      remove: remove,
      put: put,
      upload: upload
    }

    function generateQueryString(payload){
      let query =''

      for(let param in payload){
        query+=`${param}=${payload[param]}&`
      }

      return query.length?`?${query.slice(0,-1)}`:''
    }
  }
