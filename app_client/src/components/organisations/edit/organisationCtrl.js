
angular
	.module('psApp')
	.controller('organisationCtrl', organisationCtrl)

organisationCtrl.$inject = ['$$organisations','$$groups', '$$profiles','authentication','$routeParams', 'flashAlert']

function organisationCtrl($$organisations, $$groups, $$profiles, authentication, $routeParams, flashAlert) {

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
	vm.checkCRUDRights = authentication.checkCRUDRights

	vm.add = add
	vm.remove = remove
	vm.update = update
	vm.import = importCSV

	init()

	function init(){
		getOrganisation()
	}

	function getOrganisation(){
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
			})
	}

	function add(){
		$$profiles.post({
			name: null,
			role: 'student',
			organisation: vm.org.id
		}).then(data=>{
			flashAlert.success(data.data.message)
		}).catch(data=>{
			flashAlert.error(data.data.message)
		}).finally(init)
	}

	function remove(id){
		$$profiles.remove({
			id: id
		}).then(data=>{
			flashAlert.success(data.data.message)
		}).catch(data=>{
			flashAlert.error(data.data.message)
		}).finally(init)
	}

	function update(member){
		$$profiles.put({
			id: member._id,
			name: member.name
		}).then(data=>{
			flashAlert.success(data.data.message)
		}).catch(data=>{
			flashAlert.error(data.data.message)
		}).finally(init)
	}

	function importCSV(file){
		$$profiles.upload({
			org_id: vm.org.id,
			file: file
		}).then(resp=>{
			flashAlert.success(resp.data.message)
			init()
		}).catch(err=>{
			flashAlert.error(err.data)
		})
	}

}

