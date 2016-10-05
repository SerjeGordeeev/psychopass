export default wpApp =>{

    require('./app_header.scss')
    //anguar.module('appHeader',['wpApp']).config(hostGroupOptions)
        wpApp.directive('appHeader', hostGroupOptions)

    function hostGroupOptions() {
        return{
            restrict: 'E',
            template: require('./appHeader.html'),
            controllerAs: 'vm',
            controller: require('./appHeaderController.js')
        }
    }

}
