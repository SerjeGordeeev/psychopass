
angular
	.module('psApp')
	.controller('groupsCtrl', groupsCtrl)

groupsCtrl.$inject = ['$$groups','authentication', '$$profiles']

function groupsCtrl($$groups, authentication, $$profiles) {

	var vm = this

	vm.groups = []
	vm.mentors = []
	vm.filters = []
	vm.crudRights = ['admin','org']

	vm.add = add
	vm.remove = remove
	vm.update = update
	vm.checkCRUDRights = checkCRUDRights

	init()

	function init(){
		$$groups.getList().then(resp=>{
			vm.groups = resp.data
		})

		$$profiles.getList({
			role:'psycholog',
			group: null
		}).then(resp=>{
			vm.mentors = resp.data
		})
	}

	function checkCRUDRights(){
		let userRole = authentication.currentUser().role
		return vm.crudRights.includes(userRole)
	}

	function add(){
		$$groups.post({
			name: null,
			mentor: null
		}).then(data=>{
			init()
		})
	}

	function remove(id){
		$$groups.remove({
			id: id
		}).then(data=>{
			init()
		})
	}

	function update(group){
		$$groups.put({
			id: group._id,
			name: group.name,
			mentor: group.mentor
		}).then(data=>{
			init()
		})
	}
}
