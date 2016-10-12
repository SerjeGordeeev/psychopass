
angular
	.module('psApp')
	.controller('organisationsCtrl', organisationsCtrl)

organisationsCtrl.$inject = ['$$organisations','authentication']

function organisationsCtrl($$organisations, authentication) {
	var vm = this
	vm.orgs = []

	vm.filters = [
		{
			//value: null,
			title:'Тип организации',
			options: [{name:'Срань',id:1}, {name:'Говно',id:2}]
		},
		{
			//value: null,
			title:'Форма подчинения',
			options: [{name:'Диктатура',id:1}, {name:'Монархия',id:2}]
		}
	]

	
	$$organisations.getList().then(data=>{
		vm.orgs = data.data
	})

	function orgGetterSetter(value){
		console.log(value)
	}
}
