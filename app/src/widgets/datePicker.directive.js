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
    .directive('datePicker', datePicker);

  /* @ngInject */
  function datePicker(){

    return {
      link: link,
      restrict: 'E',
      templateUrl: 'src/widgets/datepicker.template.html',
      scope: {
        date: '=',
        maxDate: '=',
        minDate: '=',
        disabled:'='

      }
    };

    /////////////////////

    function link(scope, elem, attrs){
        scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        scope.datePickerOpened = false;

        scope.minDate = (scope.minDate === '') ? '1970-01-01' : scope.minDate;

        scope.openDatePicker = function($event){
            if(!scope.disabled){
                $event.preventDefault();
                $event.stopPropagation();
                scope.datePickerOpened = true;
            }
        };
    }
  }

}());
