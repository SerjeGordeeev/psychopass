module.exports = function ($scope, $timeout, $http, Upload) {

	require('./testing.scss')

	let vm = this

	vm.hosts = []


	vm.startTesting = startTesting
	vm.upload = upload
	vm.remove = remove
	vm.addHost = addHost
	
	function startTesting() {
		$http({
			method: 'GET',
			url:'api/start'
		}).then((data)=>{
			console.log(data)
		})
	}

	function upload(file, errFiles) {
		console.log(file)
		$scope.f = file;
		$scope.errFile = errFiles && errFiles[0];
		if (file) {
			file.upload = Upload.upload({
				url: 'api/upload',
				data: {file: file}
			})
			.then(function (response) {
				$timeout(function () {
					file.result = response.data;
					vm.hosts.push(response.data)
					console.log('uploaded')
				});
			}, function (response) {
				if (response.status > 0)
					$scope.errorMsg = response.status + ': ' + response.data;
			}, function (evt) {
				file.progress = Math.min(100, parseInt(100.0 *
					evt.loaded / evt.total));
			});
		}
	}

	function remove(host){
		vm.hosts.remove(host)
	}

	function addHost(){
		vm.hosts.push([])
	}

}
