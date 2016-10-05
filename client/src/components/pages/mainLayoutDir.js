export default wpApp =>{

    require('./main_layout.scss')

    angular.module('mainLayout', ['wpApp','ngRoute']).config(route)

    function route($routeProvider, $locationProvider) {
        console.log($locationProvider)
        $routeProvider
            .when('/home', {
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
