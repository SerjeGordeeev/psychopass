const angular = require('angular')
				require('angular-route')

require('angular-material')
require('../node_modules/angular-material/angular-material.min.css')

	angular.module('psApp', ['ngMaterial','ngRoute'])


	function config ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/',{
				redirectTo: '/home'
			})
			.when('/home', {
				templateUrl: 'src/components/home/home.html',
				controller: 'homeCtrl',
				controllerAs: 'vm'
			})
			.when('/auth', {
				templateUrl: 'src/components/auth/auth.html',
				controller: 'authCtrl',
				controllerAs: 'vm'
			})
			.when('/psychologs', {
				templateUrl: 'src/components/psychologs/psychologs.html',
				controller: 'psychologsCtrl',
				controllerAs: 'vm'
			})
			.when('/organisations', {
				templateUrl: 'src/components/organisations/organisations.html',
				controller: 'organisationsCtrl',
				controllerAs: 'orgs'
			})
			.when('/organisations/:id', {
				templateUrl: 'src/components/organisations/edit/organisation.html',
				controller: 'organisationCtrl',
				controllerAs: 'org'
			})
			.when('/members', {
				templateUrl: 'src/components/members/members.html',
				controller: 'membersCtrl',
				controllerAs: 'vm'
			})
			//.otherwise({redirectTo: '/'})
		
		$locationProvider.html5Mode(true)
	}

	angular
		.module('psApp')
		.config(['$routeProvider', '$locationProvider', config])
		.run(['$rootScope', '$location', 'authentication', run])

	function run($rootScope, $location, authentication) {
		$rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
			if (!authentication.isLoggedIn()) {
				$location.path('/auth')
			}
			else{

			}
		})
	}


	requireAll(require.context("./src/components", true, /\.js$/))
	function requireAll(requireContext){
		return requireContext.keys().map(requireContext)
	}
