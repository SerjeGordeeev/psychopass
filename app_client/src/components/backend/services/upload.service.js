
angular
	.module('psApp')
	.service('$$uploader', uploader)

//uploader.$inject = ['$http', '$timeout']
function uploader ($http, $timeout,Upload) {

	let upload = function(url, file, errFiles){
		/*let f = file;
		let errFile = errFiles && errFiles[0];*/
		if (file) {
			//console.log(file)
			return file.upload = Upload.upload({
				url: url,
				data: {file: file}
			 })
/*				.then(function (response) {
					$timeout(function () {
						file.result = response.data;
						vm.hosts.push(response.data)
						console.log('uploaded')
					});
				}, function (response) {
					if (response.status > 0)
						let errorMsg = response.status + ': ' + response.data;
				}, function (evt) {
					file.progress = Math.min(100, parseInt(100.0 *
						evt.loaded / evt.total));
				})*/
		}
		else return 0
	}

	return{
		upload: upload
	}
}