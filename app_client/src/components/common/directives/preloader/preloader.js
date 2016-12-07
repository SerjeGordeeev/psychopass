(function () {
	"use strict";

	let DIRECTIVE_PARAMS = {
		template: require('./AjaxLoader.html'),
		scope: {
			promise: "="
		},
		controller: Controller,
		controllerAs: 'alCtrl'
	}

	angular
		.module('psApp')
		.directive('ajaxLoader', () => DIRECTIVE_PARAMS)


	require('./styles.scss')


	/**
	 * @ngInject
	 */
	function Controller ($scope) {
		let vm = this

		vm.state = vm.state || ($scope.promise ? $scope.promise.$$state.status : 2) || 0;

		$scope.$watchCollection(
			() => $scope.promise,
			(newV) => {
				if (newV) {
					vm.state = 0;

					newV.then(() => {
						vm.state = 1
					})
				}
			}
		);

	}

})();