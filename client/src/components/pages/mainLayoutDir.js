export default wpApp =>{

    require('./main_layout.scss')
    require('./testing/host_group/hostGroupDir')(wpApp)

    angular.module('mainLayout', ['wpApp','ngRoute']).config(route)

    function route($routeProvider, $locationProvider) {
        console.log($locationProvider)
        $routeProvider
            .when('/',{
                redirectTo: '/testing'
            })
            .when('/testing', {
                restrict: 'E',
                template: require('./testing/testing.html'),
                controllerAs: 'vm',
                controller: require('./testing/testingController.js')
            })
            .when('/reports', {
                restrict: 'E',
                template: require('./reports/reports.html'),
                controllerAs: 'vm',
                controller: require('./reports/reportsController.js')
            })
            .otherwise({redirectTo: '/'})

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
    }

}
