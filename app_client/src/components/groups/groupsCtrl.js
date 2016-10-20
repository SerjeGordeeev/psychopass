
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
	vm.withMentorFilter = withMentorFilter

	init()

	function init(){
		$$groups.getList().then(resp=>{
			vm.groups = resp.data

			vm.groups.forEach(group =>{
				group.oldMentor = group.mentor
			})

			$$profiles.getList({
				role: 'student'
			}).then(resp=>{
				vm.groups.forEach(group=>{
					group.membersCount = resp.data.filter(member=>member.group == group._id).length
				})
			})

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

	function remove(group){
		$$groups.remove({
			id: group._id
		}).then(data=>{
			let message = data.data.message
			$$profiles.put({
				id: group.mentor,
				group: null
			}).then(resp=>{
				flashAlert.success(message)
			})
		}).catch(data=>{
			flashAlert.error(data.data.message)
		}).finally(init)
	}

	function update(group){
		//console.log(group)
		$$groups.put({
			id: group._id,
			name: group.name,
			mentor: group.mentor
		}).then(resp=>{
			if(group.mentor != group.oldMentor){
				$$profiles.put({
					id: group.mentor || group.oldMentor,
					group: group._id
				}).then(data=>{
					flashAlert.success(data.data.message)
				}).catch(data=>{
					flashAlert.error(data.data.message)
				}).finally(init)
			}
			else flashAlert.success(resp.data.message)
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

	function withMentorFilter(group) {
		if(vm.filters[0].value === null) return true
		return !!group.mentor == vm.filters[0].value
	}
}
