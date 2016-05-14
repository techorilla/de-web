/**
 * @ngdoc directive
 * @name app.widgets.directive:datePicker
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
        .directive('datePicker', datePicker)
        .directive('datePartOnly',datePartOnly);

    function datePartOnly($filter,$parse,appFormats){
        return{
            restrict:'EAC',
            require:'?ngModel',

            link:function(scope,element,attrs,ngModel,ctrl){
                ngModel.$parsers.push(function(viewValue){
                    return $filter('date')(viewValue, appFormats.Date);
                });
            }
        }
    }

    /* @ngInject */
    function datePicker(appFormats){

        return {
            link: link,
            restrict: 'E',
            templateUrl: 'src/widgets/datepicker.template.html',
            scope: {
                date: '=',
                maxiDate: '=',
                miniDate: '=',
                noBorder:'='
            }
        };

        /////////////////////

        function link(scope, elem, attrs){
            scope.appFormats = appFormats;
            scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };
            scope.datePickerOpened = false;

            scope.minDate = (scope.minDate === '') ? '1970-01-01' : scope.minDate;

            scope.openDatePicker = function($event){
                if(!scope.noBorder){
                    $event.preventDefault();
                    $event.stopPropagation();
                    scope.datePickerOpened = true;
                }
            };
        }
    }

}());
