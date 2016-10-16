
angular
	.module('psApp')
	.controller('organisationCtrl', organisationCtrl)

organisationCtrl.$inject = ['$$organisations','$$groups' ,'authentication','$routeParams']

function organisationCtrl($$organisations, $$groups, authentication, $routeParams) {

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

	vm.roleTitle = authentication.roleTitle

	init()

	function init(){
		getOrganisations()
	}

	function getOrganisations(){
		$$organisations.getList({
			id: vm.org.id,
			with_members: true
		}).then(res => {
			vm.org.name = res.data[0].name
			vm.org.is_psycho = res.data[0].is_psycho
			vm.org.members = res.data[0].members
			getGroups()
		})
	}

	function getGroups(){
		// let membersIds = vm.org.members.map(member=>{
		// 	return member._id
		// })
		$$groups.getList().then(resp=>{
				let groups = resp.data
				vm.org.members.map(member =>{
					member.groupData = groups.find(group =>{
						return group._id == member.group
					})
				})
				console.log(vm.org.members)
			})
	}


}

