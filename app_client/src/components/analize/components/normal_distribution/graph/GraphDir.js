  var DIR_PARAMS = {
      restrict: 'E',
      template: require('./Graph.html'),
      controller: Controller,
      controllerAs: "graphCtrl",
      scope: {
        prop: "="
      }
  }

  angular
    .module('psApp')
    .directive('graph', ()=>DIR_PARAMS);

  require("./style.scss");

  function Controller ($scope) {
    let vm = this;

    vm.prop = $scope.prop;

    $scope.labels = ["min","x < μ - σ", "μ", "x > μ + σ","max"];
    
    $scope.series = ['% студентов'/*, 'Series B'*/];
    
    let results = getPartsArray();
  
    $scope.data = [
      [...results,100]/*,
      [28, 48, 40, 19, 86, 27, 90]*/
    ];

    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };

    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }/*, { yAxisID: 'y-axis-2' }*/];
    
    $scope.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          }/*,
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right'
          }*/
        ]
      }
    };

    function getPartsArray(){
      let Max = _.max(vm.prop.values);
      let values =  _.sortBy(vm.prop.values);

      return _.map($scope.labels, label => {
        let result = null;

        switch (label){
          case "min":
            result = 0;
            break;
          case "x < μ - σ":
            result = _.filter(values, val=>{
              console.log(val, val < vm.prop.mu - vm.prop.sigma)
              return val < vm.prop.mu - vm.prop.sigma
            });
            break;
          case "μ":
            result = _.filter(values, val=>{
              return val >= vm.prop.mu - vm.prop.sigma && val <= vm.prop.mu + vm.prop.sigma
            });
            break;
          case "x > μ + σ":
            result = _.filter(values, val=>{
              return val > vm.prop.mu + vm.prop.sigma
            });
            break;
          case "max":
            //result = 100;
            break;
        }
        
       
       // result = result?result.length:0/values.length;
       // console.log(result?result.length:0,values.length, (result?result.length:0)/values.length)
        return ((result?result.length:0)/values.length)*100
      });
    }

  }
