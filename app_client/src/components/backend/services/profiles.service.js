
  angular
    .module('psApp')
    .service('$$profiles', profiles)

  function profiles ($http, $$uploader) {

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

    var upload = function (payload) {
      return $$uploader.upload('/api/profiles/upload?id='+payload.id, payload.file, null)
    }

    var courses = function(){
      return [
        {value: 1, name: '1'},
        {value: 2, name: '2'},
        {value: 3, name: '3'},
        {value: 4, name: '4'}
/*        {value: 5, name: 'магистратура 1'},
        {value: 6, name: 'магистратура 2'}*/
      ]
    }

    return {
      getList : getList,
      post: post,
      remove: remove,
      put: put,
      upload: upload,
      courses: courses
    }

    function generateQueryString(payload){
      let query =''

      for(let param in payload){
        query+=`${param}=${payload[param]}&`
      }
      return query.length?`?${query.slice(0,-1)}`:''
    }
  }
