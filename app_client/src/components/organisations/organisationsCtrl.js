
angular
	.module('psApp')
	.controller('organisationsCtrl', organisationsCtrl)

organisationsCtrl.$inject = ['$$organisations','authentication']

function organisationsCtrl($$organisations, authentication) {
	var vm = this

	$$organisations.getList().then(data=>{
		console.log(data)
	})
	
}
