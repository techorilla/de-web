/**
 * @ngdoc directive
 * @name app.widgets.directive:filterBar
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
    .directive('filterBar', filterBar);

  /* @ngInject */
  function filterBar(){

    return {
      link: link,
      restrict: 'E',
      templateUrl: 'src/widgets/filterBar.template.html',
      scope: {
        test: '=',
        datePickerNeeded:'=',
        seller:'=',
        buyer:'=',
        product:'=',
        tranStatus:'=',
        bpTypes:'=',
        country:'='
      }

    };

    /////////////////////

    function link(scope, elem, attrs){
        if(!scope.datePicker){
            scope.datePicker= {};
            scope.datePicker.date = {
                startDate: new Date(moment()._d),
                endDate: new Date(moment()._d)
            };
        }
        scope.dateOptions = {
            opens: 'left',
            drops: 'down',
            buttonClasses: ['btn', 'btn-sm'],
            applyClass: 'btn-primary',
            cancelClass: 'btn-default',
            separator: ' to ',
            linkedCalendars: false,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }

    }
  }

}());
