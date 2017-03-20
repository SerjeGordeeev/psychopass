
angular
	.module('psApp')
	.controller('organisationCtrl', organisationCtrl)

organisationCtrl.$inject = ['$$organisations','$$groups', '$$profiles','authentication','$routeParams', 'flashAlert']

function organisationCtrl($$organisations, $$groups, $$profiles, authentication, $routeParams, flashAlert) {

	var vm = this

	vm.courses = $$profiles.courses()
	
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
		},
		{
			title: 'Курс',
			options: vm.courses
		},
		{
			title: 'Характеристики',
			options: [
				{name: 'Проставлены', value:true},
				{name: 'Не проставлены', value:false}
			]
		}
	]

	vm.roleTitle = authentication.roleTitle
	vm.checkCRUDRights = authentication.checkCRUDRights

	vm.add = add
	vm.remove = remove
	vm.update = update
	vm.import = importCSV
	vm.withGroupFilter = withGroupFilter
	vm.courseFilter = courseFilter
	vm.propsFilter = propsFilter

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
			name: member.name,
			course: member.course
		}).then(data=>{
			flashAlert.success(data.data.message)
		}).catch(data=>{
			flashAlert.error(data.data.message)
		}).finally(init)
	}

	function importCSV(file){
		$$profiles.upload({
			id: vm.org.id,
			file: file
		}).then(resp=>{
			flashAlert.success(resp.data.message)
			init()
		}).catch(err=>{
			if(err) flashAlert.error(err.data.message)
		})
	}

	function withGroupFilter(member){
		if(vm.filters[0].value == null) return true
		else return vm.filters[0].value == !!member.group
	}

	function courseFilter(member){
		if(vm.filters[1].value == null) return true
		else return vm.filters[1].value == member.course
	}

	function propsFilter(member){
		//console.log(vm.filters[2].value , (member.properties.length != 0))
		if(vm.filters[2].value == null) return true
		else{
			console.log(member.name, member.properties.filter(prop=>prop.actuallVal).length)
			return vm.filters[2].value == member.properties.filter(prop=>prop.actuallVal).length > 1//(member.properties.length != 0)
		}
	}

}

