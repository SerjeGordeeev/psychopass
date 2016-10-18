require('./dialog.scss')
module.exports = function($$organisations, $$groups, $$profiles, $routeParams, $mdDialog, $mdMedia, $scope, authentication){

	let vm = this

	vm.groups = []
	vm.members = []

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