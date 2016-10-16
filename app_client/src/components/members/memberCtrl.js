
angular
	.module('psApp')
	.controller('membersCtrl', membersCtrl)

membersCtrl.$inject = ['authentication', '$$groups', '$$profiles', '$$organisations']

function membersCtrl(authentication, $$groups, $$profiles, $$organisations) {
	var vm = this



	vm.members = []

	init()

	function init(){
		getPsychologs()
	}

	function getPsychologs(){
		$$profiles.getList({
			role:'student'
		}).then(resp=>{
			vm.members = resp.data
			getGroups()
			getOrganisations()
		})
	}

	function getGroups(){
		$$groups.getList().then(resp=>{
			let groups = resp.data
			vm.members.forEach(member =>{
				member.groupData = groups.find(group =>{
					return group._id == member.group
				})
			})
		})
	}

	function getOrganisations(){
		$$organisations.getList().then(resp=>{
			let organisations = resp.data
			//console.log(organisations, vm.members)
			vm.members.forEach(member =>{
				member.organisationData = organisations.find(org =>{
					return org._id == member.organisation
				})
			})
		})
	}
}
