
angular
	.module('psApp')
	.controller('propsCtrl', propsCtrl)

propsCtrl.$inject = ['$$props','authentication','flashAlert', '$$profiles']

function propsCtrl($$props, authentication, flashAlert, $$profiles) {

	var vm = this

	vm.props = []
	vm.filters = [],
	vm.crudRights = ['admin','org']

	vm.psychoFilter = psychoFilter
	vm.add = add
	vm.remove = remove
	vm.update = update
	vm.checkCRUDRights = authentication.checkCRUDRights

	init()

	createFilters(['Числовые', 'Формальные'], 'Тип характеристик')

	function init(){
		$$props.getList().then(data=>{
			vm.props = data.data
/*			$$profiles.getList().then(resp=>{
				vm.props.forEach(org=>{
					org.membersCount = resp.data.filter(member=>member.organisation == org._id).length
				}) 
			})*/
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
		$$props.post({
			name: '',
			type: null
		}).then(data=>{
			flashAlert.success(data.data.message)
		}).catch(data=>{
			flashAlert.error(data.data.message)
		}).finally(init)
	}

	function remove(id){
		$$props.remove({
			id: id
		}).then(data=>{
			flashAlert.success(data.data.message)
		}).catch(data=>{
			flashAlert.error(data.data.message)
		}).finally(init)
	}

	function update(prop){
		console.log(prop)
		$$props.put({
			id: prop._id,
			name: prop.name,
			type: prop.type,
			min: prop.min,
			max: prop.max,
			description: prop.description
		}).then(data=>{
			flashAlert.success(data.data.message)
		}).catch(data=>{
			flashAlert.error(data.data.message)
		}).finally(init)
	}
}
