
angular
	.module('psApp')
	.controller('groupsCtrl', groupsCtrl)

groupsCtrl.$inject = ['$$groups','authentication', '$$profiles','flashAlert']

function groupsCtrl($$groups, authentication, $$profiles, flashAlert) {

	var vm = this

	vm.groups = []
	vm.mentors = []
	vm.filters = []
	vm.crudRights = ['admin','org']

	vm.filters = [
		{
			value: null,
			title: 'Психолог',
			options: [
				{name: 'Назначен', value:true},
				{name: 'Не назначен', value:false}
			]
		}
	]

	vm.add = add
	vm.remove = remove
	vm.update = update
	vm.checkCRUDRights = checkCRUDRights
	vm.mentorFilter = mentorFilter

	init()

	function init(){
		$$groups.getList().then(resp=>{
			vm.groups = resp.data
		})

		$$profiles.getList({
			role:'psycholog'
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
			flashAlert.success(data.data.message)
		}).catch(data=>{
			flashAlert.error(data.data.message)
		}).finally(init)
	}

	function remove(id){
		$$groups.remove({
			id: id
		}).then(data=>{
			flashAlert.success(data.data.message)
		}).catch(data=>{
			flashAlert.error(data.data.message)
		}).finally(init)
	}

	function update(group){
		$$groups.put({
			id: group._id,
			name: group.name,
			mentor: group.mentor
		}).then(resp=>{
			//console.log(resp, group)
			$$profiles.put({
				id:group.mentor,
				group:group._id
			}).then(data=>{
				flashAlert.success(data.data.message)
			}).catch(data=>{
				flashAlert.error(data.data.message)
			}).finally(init)
		}).catch(data=>{
			flashAlert.error(data.data.message)
		}).finally(init)
	}
	
	function mentorFilter(group){
			return (mentor)=>{
				//console.log(mentor,group)
				if(mentor.group){
					if(mentor._id == group.mentor) return true
					return false
				}
				return true
			}
	}
}
