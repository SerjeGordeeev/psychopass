require('./dialog.scss')
module.exports = function($$organisations, $$groups, $$profiles, $routeParams, $mdDialog, $mdMedia, $rootScope, $scope, authentication, flashAlert){

	let vm = this

	vm.groups = []
	vm.members = []
	vm.groupId = $routeParams.id
	
	vm.filters={
		organisation:{
			value: null,
			f: (member)=>{
				if(vm.filters.organisation.value === null) return true
				if(vm.filters.organisation.value == member.organisation) return true
				return false
			}
		}
	}

	vm.addMembersToGroup = addMembersToGroup

	init()
	function init(){
		$$profiles.getList({
			role:'student',
			group: null
		}).then(resp=>{
			vm.members = resp.data
			getOrganisations()
		})
	}

	function getOrganisations(){
		$$organisations.getList({
			is_psycho: false
		}).then(resp=>{
			vm.organisations = resp.data
			vm.members.forEach(member =>{
				member.organisationData = vm.organisations.find(org =>{
					return org._id == member.organisation
				})
			})
		})
	}

	function addMembersToGroup(){

		let newMembers = {
			ids: [],
			members: []
		}

		vm.members.forEach(member => {
			if(member.selected){
				member.group = vm.groupId
				newMembers.ids.push(member._id)
				newMembers.members.push(member)
			}
		})

		$$profiles.put(newMembers).then(resp=>{
			flashAlert.success(resp.data.message)
			$scope.hide()
		}).catch(err=>{
			flashAlert.error('Error')
		})

	}

	$scope.hide = function() {
		$mdDialog.hide()
	}
	$scope.cancel = function() {
		$mdDialog.cancel()
	}
	$scope.answer = function(answer) {
		$mdDialog.hide(answer)
	}
}