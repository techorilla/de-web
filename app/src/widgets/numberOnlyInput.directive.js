/**
 * @ngdoc directive
 * @name app.widgets.directive:numberOnlyInput
 * @scope true
 * @param {object} test test object
 * @restrict E
 *
 * @description < description placeholder >
 *
 */

(function(){

  'use strict';

  angular
    .module('app.widgets')
    .directive('numberOnlyInput', numberOnlyInput);

  /* @ngInject */
    function numberOnlyInput () {
        return {
            restrict: 'EA',
            template: '<input ng-class="{\'currency\': currency}" style="cursor:default" ng-disabled="disabled" ng-click="reset()" class="form-control " placeholder="{{inputPlace}}" name="{{inputName}}" ng-model="inputValue" />',
            scope: {
                inputValue: '=',
                inputName: '=',
                inputPlace: '@',
                disabled: '=',
                currency: '='
            },
            link: function (scope) {
                scope.reset = function(){
                  var temp =  scope.inputValue;
                  scope.inputValue=0;
                };
                scope.$watch('inputValue', function(newValue,oldValue) {
                    var arr = String(newValue).split("");
                    if (arr.length === 0) return;
                    if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
                    if (arr.length === 2 && newValue === '-.') return;
                    if (isNaN(newValue)) {
                        scope.inputValue = oldValue;
                    }
                });
            }
        };
    }


}());
