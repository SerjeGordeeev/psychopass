export default wpApp =>{

    require('./app_footer.scss')

    wpApp.directive('appFooter', hostGroupOptions)

    function hostGroupOptions() {
        return{
            restrict: 'E',
            template: require('./appFooter.html'),
            controllerAs: 'vm',
            controller: require('./appFooterController.js')
        }
    }

}
