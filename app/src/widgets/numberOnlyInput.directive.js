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
            template: '<input ng-class="{\'currency\': currency}" style="cursor:default" ng-disabled="disabled" ng-change="reset()" class="form-control " placeholder="{{inputPlace}}" name="{{inputName}}" ng-model="inputValue" />',
            scope: {
                inputValue: '=',
                inputName: '=',
                inputPlace: '@',
                disabled: '=',
                currency: '='
            },
            link: function (scope) {

//                scope.reset = function(){
//                  if(scope.inputValue === "" || scope.inputValue === null){
//                      scope.inputValue=0;
//                  }
//                  scope.inputValue = parseInt(scope.inputValue);
//                };
//                scope.reset();
                scope.$watch('inputValue', function(newValue,oldValue) {
                    if(newValue === '' || newValue === null){
                        scope.inputValue = 0;
                    }
                    else if (! /^[0-9.]+$/.test(newValue)) {
                        // Validation failed

                        scope.inputValue = oldValue;
                        return;
                    }
                    else if(scope.inputValue.length >= 2 && scope.inputValue[1]!=='.' && scope.inputValue[0]==='0'){
                        scope.inputValue = scope.inputValue.substr(1);
                    }
                });
            }
        };
    }


}());
