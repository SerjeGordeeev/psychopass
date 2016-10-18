require('./my_group.scss')
angular
	.module('psApp')
	.controller('myGroupCtrl', myGroupCtrl)

myGroupCtrl.$inject = ['authentication','$$profiles', '$$groups','$$props']

function myGroupCtrl(authentication, $$profiles, $$groups, $$props) {
	var vm = this

	vm.group = {
		id: authentication.currentUser().group
	}
	vm.props = []

	init()

	function init(){

		if(vm.group.id){
			getMembers()
			getGroup()
			getProps()
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

	function getProps(){
		$$props.getList()
			.then(resp => {
			vm.props = resp.data
		})
	}

}
