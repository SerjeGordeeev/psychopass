export default wpApp =>{

	angular.module('auth', ['wpApp','ngRoute']).config(route)

	function route($routeProvider, $locationProvider) {

		$routeProvider
			.when('/', {
				redirectTo: '/auth'
			})
			.when('/auth', {
				restrict:'E',
				template: require('./auth.html'),
				controller: require('./authController.js'),
				controllerAs:'ath'
			})

		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
	}

	require('../components/index')(wpApp)

}