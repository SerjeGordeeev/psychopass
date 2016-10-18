
angular
	.module('psApp')
	.controller('myGroupCtrl', myGroupCtrl)

myGroupCtrl.$inject = ['authentication','$$profiles', '$$groups']

function myGroupCtrl(authentication, $$profiles, $$groups) {
	var vm = this

	vm.group = {
		id: authentication.currentUser().group
	}

	init()

	function init(){

		if(vm.group.id){
			getMembers()
			getGroup()
		}
		console.log(vm)
	}

	function getMembers(){
		$$profiles.getList({
			group: vm.group.id
		}).then(resp => {
			vm.group.members = resp.data
		})
	}

	function getGroup(){
		$$groups.getList({
			id: vm.group.id
		}).then(resp => {
			vm.group.groupData = resp.data[0]
		})
	}

}
