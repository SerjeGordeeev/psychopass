
angular
	.module('psApp')
	.service('$$uploader', uploader)

//uploader.$inject = ['$http', '$timeout']
function uploader ($http, $timeout, Upload) {

	let upload = function(url, file, errFiles){
		/*let f = file;
		let errFile = errFiles && errFiles[0];*/
		if (file) {
			console.log(file)
			//console.log(file)
			return file.upload = Upload.upload({
				url: url,
				data: {file: file}
			 })
		}
		else return Promise.reject()
	}

	return{
		upload: upload
	}
}