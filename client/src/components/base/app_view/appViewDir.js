export default wpApp =>{

    require('./app_view.scss')
    //angular.module('appView',['wpApp']).config(hostGroupOptions)
    wpApp.directive('appView', hostGroupOptions)

    function hostGroupOptions() {
        return{
            restrict: 'E',
            template: require('./appView.html'),
            controllerAs: 'vm',
            controller: require('./appViewController.js')
        }
    }

}
