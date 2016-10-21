
angular
	.module('psApp')
	.controller('organisationsCtrl', organisationsCtrl)

organisationsCtrl.$inject = ['$$organisations','authentication','flashAlert', '$$profiles']

function organisationsCtrl($$organisations, authentication, flashAlert, $$profiles) {

	var vm = this

	vm.orgs = []
	vm.filters = [],
	vm.crudRights = ['admin','org']

	vm.psychoFilter = psychoFilter
	vm.add = add
	vm.remove = remove
	vm.update = update
	vm.import = importCSV
	vm.checkCRUDRights = authentication.checkCRUDRights

	init()

	createFilters(['Учебные', 'Психологические'], 'Тип организации')
	function init(){
		$$organisations.getList({
			with_members: true
		}).then(data=>{
			vm.orgs = data.data
			$$profiles.getList().then(resp=>{
				vm.orgs.forEach(org=>{
					org.membersCount = resp.data.filter(member=>member.organisation == org._id).length
				}) 
			})
		})
	}

	function createFilters(options, title){
		let filter = {title: title, options: []}

		options.forEach((option, index) => {
			filter.options.push({
				name: option,
				value: option.id || index
			})
		})

		vm.filters.push(filter)
	}

	function psychoFilter(org, index){
		if(!arguments.length) return !!vm.filters[0].value
		if(vm.filters[0].value == null) return true
		else return !!vm.filters[0].value == org.is_psycho
	}

	function add(){
		$$organisations.post({
			name: null,
			is_psycho: psychoFilter()
		}).then(data=>{
			flashAlert.success(data.data.message)
		}).catch(data=>{
			flashAlert.error(data.data.message)
		}).finally(init)
	}

	function remove(id){
		$$organisations.remove({
			id: id
		}).then(data=>{
			flashAlert.success(data.data.message)
		}).catch(data=>{
			flashAlert.error(data.data.message)
		}).finally(init)
	}

	function update(org){
		$$organisations.put({
			id: org._id,
			name: org.name,
			is_psycho: org.is_psycho
		}).then(data=>{
			flashAlert.success(data.data.message)
		}).catch(data=>{
			flashAlert.error(data.data.message)
		}).finally(init)
	}

	function importCSV(file, errFiles){
		//console.log(file, errFiles)
		$$organisations.upload({
			file: file
		}).then(resp=>{
			flashAlert.success(resp.data.message)
			init()
		}).catch(err=>{
			if(err) flashAlert.error(err.data.message)
		})
	}
}
