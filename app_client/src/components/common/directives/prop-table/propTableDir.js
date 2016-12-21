
angular
    .module('psApp')
    .directive('propTable', propTable)

require('./prop_table.scss')
function propTable () {
    return {
        restrict: 'E',
        template: require('./propTable.html'),
        controller: 'propTableCtrl as pTbCtrl',
        scope: {
            members: '=',
            props: '=',
            filters: '='
        }
    }
}

angular
    .module('psApp')
    .controller('propTableCtrl', propTableCtrl)

propTableCtrl.$inject = ['$scope','$$props']
function propTableCtrl($scope, $$props) {
    var vm = this

/*    $$props.getList().then(data=>{
        console.log(data)
        
    })*/
    //console.log($scope.filters)
    vm.props = $scope.props
    vm.members = $scope.members
    
    vm.createTableBody = createTableBody
    vm.applyFilters = applyFilters

    function createTableBody(userProps){

        let result = []
        vm.props.forEach(prop=>{
            result.push(userProps.find(value=>value._id == prop._id))
        })
       // console.log(result)
        
        return result
    }
    
    function applyFilters(item){
       // console.log(item)
        let result = $scope.filters.map(filter=>{
           return filter(item)
        }).filter(result=>result)


       return result.length == $scope.filters.length
    }

}



