
angular
	.module('psApp')
	.controller('groupCtrl', groupCtrl)

groupCtrl.$inject = ['$$groups','$routeParams', 'authentication', '$mdDialog', '$mdMedia', '$scope']

function groupCtrl($$groups, $routeParams, authentication, $mdDialog, $mdMedia, $scope) {

	var vm = this

	vm.members = []
	vm.group = {
		id: $routeParams.id,
		name: null,
		mentor: null,
		members: []
	}

	vm.checkCRUDRights = authentication.checkCRUDRights
	vm.showDialog = showDialog

	$$groups.getList({
		id: vm.group.id,
		with_members: true
	}).then(res => {
		vm.group.name = res.data[0].name
		vm.group.mentor = res.data[0].mentor
		vm.group.members = res.data[0].members
	})

	function showDialog(ev) {
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
		$mdDialog.show({
			controller: require('./dialog/addMembersCtrl'),
			template: require('./dialog/dialog.tmpl.html'),
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: useFullScreen
		}).then(function(answer) {
				$scope.status = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.status = 'You cancelled the dialog.';
			});
		$scope.$watch(function() {
			return $mdMedia('xs') || $mdMedia('sm');
		}, function(wantsFullScreen) {
			$scope.customFullscreen = (wantsFullScreen === true);
		});
	};

}

