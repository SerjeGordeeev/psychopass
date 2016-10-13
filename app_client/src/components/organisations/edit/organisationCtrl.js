
angular
	.module('psApp')
	.controller('organisationCtrl', organisationCtrl)

organisationCtrl.$inject = ['$$organisations','authentication','$routeParams']

function organisationCtrl($$organisations, authentication, $routeParams) {

	var vm = this

	vm.members = []
	
	console.log($routeParams)

	$$organisations.getMembers({
		id: $routeParams.id
	}).then(resp =>{
		vm.members = resp.data
	})

}

