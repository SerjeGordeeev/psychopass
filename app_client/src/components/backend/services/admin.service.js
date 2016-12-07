
angular
	.module('psApp')
	.service('$$admin', admin)

admin.$inject = ['$http']
function admin ($http) {

	var getBDBackup= function () {
		return $http.get('/api/backup')
	}

	return {
		getBDBackup : getBDBackup,
	}

}
