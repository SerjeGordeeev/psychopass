
angular
	.module('psApp')
	.controller('groupCtrl', groupCtrl)

groupCtrl.$inject = ['$$groups','$routeParams', 'authentication', '$mdDialog', '$mdMedia', '$scope', '$$profiles', 'flashAlert']

function groupCtrl($$groups, $routeParams, authentication, $mdDialog, $mdMedia, $scope, $$profiles, flashAlert) {

	var vm = this

	vm.members = []
	vm.group = {
		id: $routeParams.id,
		name: null,
		mentor: null,
		members: []
	}

	vm.courses = $$profiles.courses()
	vm.filters = [
		{
			title: 'Курс',
			options: vm.courses
		}
	]

	vm.courseFilter = courseFilter
	vm.checkCRUDRights = authentication.checkCRUDRights
	vm.showDialog = showDialog
	vm.remove = remove

	init()

	function init(){
		$$groups.getList({
			id: vm.group.id,
			with_members: true
		}).then(res => {
			vm.group.name = res.data[0].name
			vm.group.mentor = res.data[0].mentor
			vm.group.members = res.data[0].members
		})
	}

	function showDialog(ev) {
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
		$mdDialog.show({
			controller: require('./dialog/addMembersCtrl'),
			controllerAs: 'dlg',
			template: require('./dialog/dialog.tmpl.html'),
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: useFullScreen
		}).then(function(answer) {
				reloadData()
			}, function() {
				//$scope.status = 'You cancelled the dialog.';
			});
		$scope.$watch(function() {
			return $mdMedia('xs') || $mdMedia('sm');
		}, function(wantsFullScreen) {
			$scope.customFullscreen = (wantsFullScreen === true);
		});
	}

	function remove(id){
		$$profiles.put({
			id: id,
			group: null
		}).then(resp=>{
			flashAlert.success('Участник успешно удален из группы')
			reloadData()
		}).catch(err=>{
			flashAlert.error('Error')
		})
	}

	function reloadData() {
		init()
	}

	function courseFilter(member){
		if(vm.filters[0].value == null) return true
		else return vm.filters[0].value == member.course
	}

}

