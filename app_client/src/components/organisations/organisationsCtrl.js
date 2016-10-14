
angular
	.module('psApp')
	.controller('organisationsCtrl', organisationsCtrl)

organisationsCtrl.$inject = ['$$organisations','authentication']

function organisationsCtrl($$organisations, authentication) {

	var vm = this

	vm.orgs = []
	vm.filters = []
	vm.crudRights = ['admin','org']

	vm.psychoFilter = psychoFilter
	vm.add = add
	vm.remove = remove
	vm.update = update
	vm.checkCRUDRights = checkCRUDRights

	init()

	createFilters(['Учебные', 'Психологические'], 'Тип организации')
	function init(){
		$$organisations.getList().then(data=>{
			vm.orgs = data.data
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
		if(!arguments.length){
			return !!vm.filters[0].value
		}

		if(vm.filters[0].value == null){
			return true
		}
		else{
			return !!vm.filters[0].value == org.is_psycho
		}
	}

	function checkCRUDRights(){
		let userRole = authentication.currentUser().role
		return vm.crudRights.includes(userRole)
	}

	function add(){
		$$organisations.post({
			name: null,
			is_psycho: psychoFilter()
		}).then(data=>{
			//vm.orgs = data.data
			init()
		})
	}

	function remove(id){
		$$organisations.remove({
			id: id
		}).then(data=>{
			//vm.orgs = data.data
			init()
		})
	}

	function update(org){
		$$organisations.put({
			id: org._id,
			name: org.name,
			is_psycho: org.is_psycho
		}).then(data=>{
			//vm.orgs = data.data
			init()
		})
	}
}
