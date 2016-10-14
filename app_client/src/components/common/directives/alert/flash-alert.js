"use strict";
require('./alert.scss')
angular.module("alert", []).constant("alertConfig", {
  success: "alert-success",
  error: "alert-danger",
  info: "alert-info"
}).provider("flashAlert", function() {
  var a = [],
      b = 5e3;
  return {
    setAlertTime: function(a) {
      b = a
    },
    $get: ["$timeout", "alertConfig", function(c, d) {
      return {
        success: function(a) {
          this.add("success", a)
        },
        error: function(a) {
          this.add("error", a)
        },
        info: function(a) {
          this.add("info", a)
        },
        getAlert: function() {
          return a
        },
        add: function(b, c) {
          var e = {
            typeOfAlert: d[b],
            msg: c,
            remove: function(){
              a.splice(0 ,1)
            }
          };

          a.push(e), this.hideAlert(e)
        },
        hideAlert: function() {
          c(function() {
            a.shift()
          }, b)
        }
      }
    }]
  }
}).directive("alertFlash", ["flashAlert", function(a) {
  return {
    restrict: "E",
    template: require('./alert.html'),
    scope: {},
    link: function(b) {
      b.$watch(a.getAlert, function() {
        b.alerts = a.getAlert()
      })
    }
  }
}]);