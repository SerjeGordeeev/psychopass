
angular
	.module('psApp')
	.controller('groupCtrl', groupCtrl)

groupCtrl.$inject = ['$$groups','$routeParams']

function groupCtrl($$groups, $routeParams) {

	var vm = this

	vm.members = []
	vm.group = {
		id: $routeParams.id,
		name: null,
		mentor: null,
		members: []
	}

	vm.filters = [
		{
			title: 'Психолог',
			options: [
				{name: 'Назначен', value:true},
				{name: 'Не назначен', value:false}
			]
		}
	]

	$$groups.getList({
		id: vm.group.id,
		with_members: true
	}).then(res => {
		vm.group.name = res.data[0].name
		vm.group.mentor = res.data[0].mentor
		vm.group.members = res.data[0].members
	})

}

