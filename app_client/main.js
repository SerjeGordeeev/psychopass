const angular = require('angular')
				require('angular-route')


require('angular-material')
require('../node_modules/angular-material/angular-material.min.css')

require('v-accordion')
require('../node_modules/v-accordion/dist/v-accordion.min.css')

require('ng-file-upload')
require('angular-messages')
//require('moment')

	angular.module('psApp', ['ngMaterial','ngRoute','alert','vAccordion', 'ngFileUpload'])
		//.constant('moment', window.moment)

	function config ($routeProvider, $locationProvider, flashAlertProvider) {
		flashAlertProvider.setAlertTime(3000)
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
				controllerAs: 'ps'
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
			.when('/groups', {
				templateUrl: 'src/components/groups/groups.html',
				controller: 'groupsCtrl',
				controllerAs: 'groups'
			})
			.when('/groups/:id', {
				templateUrl: 'src/components/groups/edit/group.html',
				controller: 'groupCtrl',
				controllerAs: 'group'
			})
			.when('/members', {
				templateUrl: 'src/components/members/members.html',
				controller: 'membersCtrl',
				controllerAs: 'ms'
			})
			.when('/props', {
				templateUrl: 'src/components/props/props.html',
				controller: 'propsCtrl',
				controllerAs: 'prs'
			}).when('/my_group', {
				templateUrl: 'src/components/my-group/myGroup.html',
				controller: 'myGroupCtrl',
				controllerAs: 'mg'
			})
			.otherwise({redirectTo: '/'})
		
		$locationProvider.html5Mode(true)
	}

	angular
		.module('psApp')
		.config(['$routeProvider', '$locationProvider','flashAlertProvider', config])
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
