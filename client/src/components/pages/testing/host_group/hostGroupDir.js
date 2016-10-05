export default wpApp =>{

	require('./host_group.scss')
	//anguar.module('appHeader',['wpApp']).config(hostGroupOptions)
	wpApp.directive('hostGroup', hostGroupOptions)

	function hostGroupOptions() {
		return{
			restrict: 'E',
			template: require('./hostGroup.html'),
			controllerAs: 'vm',
			controller: require('./hostGroupController.js'),
			scope: {
				hostData: '='
			}
		}
	}

}
