
angular
	.module('psApp')
	.controller('organisationCtrl', organisationCtrl)

organisationCtrl.$inject = ['$$organisations','authentication','$routeParams']

function organisationCtrl($$organisations, authentication, $routeParams) {

	var vm = this

	vm.members = []
	vm.org = {
		id: $routeParams.id,
		name: null,
		is_psycho: null,
		members: []
	}

	vm.filters = [
		{
			title: 'Группа',
			options: [
				{name: 'Назначена', value:true},
				{name: 'Не назначена', value:false}
			]
		}
	]

	$$organisations.getList({
		id: vm.org.id,
		with_members: true
	}).then(res => {
		vm.org.name = res.data[0].name
		vm.org.is_psycho = res.data[0].is_psycho
		vm.org.members = res.data[0].members
	})
	
	vm.roleTitle = authentication.roleTitle

	/*	.getMembers({
		id: $routeParams.id
	}).then(resp =>{
		vm.members = resp.data
	})*/

}

