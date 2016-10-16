
module.exports = function($$groups, $routeParams, $mdDialog, $mdMedia, $scope, authentication){
	$scope.hide = function() {
		$mdDialog.hide()
	}
	$scope.cancel = function() {
		$mdDialog.cancel()
	}
	$scope.answer = function(answer) {
		$mdDialog.hide(answer)
	}
}