
angular
	.module('psApp')
	.controller('psychologsCtrl', psychologsCtrl)

psychologsCtrl.$inject = ['authentication','$$profiles', '$$groups']

function psychologsCtrl(authentication, $$profiles, $$groups) {
	var vm = this

	vm.psychologs = []

	init()

	function init(){
		getPsychologs()
	}

	function getPsychologs(){
		$$profiles.getList({
			role:'psycholog'
		}).then(resp=>{
			vm.psychologs = resp.data
			getGroups()
		})
	}

	function getGroups(){
		$$groups.getList().then(resp=>{
			let groups = resp.data
			vm.psychologs.map(pslg =>{
				pslg.groupData = groups.find(group =>{
					return group._id == pslg.group
				})
			})
		})
	}

}
