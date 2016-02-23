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
  function filterBar(appFormats){

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
        country:'=',
        buyerList: '=',
        sellerList: '=',
        productList: '=',
        tranStatusList: '=',
        datePicker: '='
      }

    };

    /////////////////////

    function link(scope, elem, attrs){
        console.log(typeof scope.datePickerNeeded);
        if(scope.datePickerNeeded === 'true'){
            if(!scope.datePicker){
                scope.datePicker= {
                    date:{
                        startDate:  new Date(),
                        endDate: new Date()
                    }
                };
            }
            scope.maxDate = new Date();
            scope.$watch('datePicker',function(oldVal,newVal){
                console.log(newVal);
            },true);
            scope.dateOptions = {
                opens: 'left',
                drops: 'down',
                format: appFormats.FullDate,
                customRangeLabel: 'Select Date',
                daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                firstDay: 1,
                showDropdowns: true,
                showWeekNumbers: true,
                buttonClasses: ['btn', 'btn-sm'],
                applyClass: 'btn-primary',
                minDate:moment().subtract(20, 'years'),
                maxDate:moment(),
                cancelClass: 'btn-default',
                separator: ' to ',
                linkedCalendars: false,
                eventHandlers:{
                    'show.daterangepicker': function(ev, picker){
                        console.log(ev);
                        console.log(picker);
                    }
                },
                locale: {
                    applyLabel: 'Submit',
                    cancelLabel: 'Cancel',
                    fromLabel: 'From',
                    toLabel: 'To',
                    customRangeLabel: 'Select Date Range',
                    daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
                    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    firstDay: 1
                },
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
  }

}());
