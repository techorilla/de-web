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
        datePicker: '=',
        onBpTypesSelectedChanged:'&',
        onBuyersSelectedChanged:'&',
        onSellersSelectedChanged:'&',
        onProductsSelectedChanged:'&',
        onCountrySelectedChanged:'&',
        onTranStatusSelectedChanged:'&',
        onDateChange:'&'
      }

    };

    /////////////////////

    function link(scope, elem, attrs){
        scope.appFormats = appFormats;
        scope.maxDate = moment();
        scope.ranges= {
                    'Today': [moment().startOf('day'), moment().endOf('day')],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment()],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                    'This Year': [moment().startOf('year'), moment()]
        };
        scope.seperator = ' to ';
        scope.datePickerChanged = function(dateRange){
            console.log(dateRange);
            scope.onDateChange({dateRange: dateRange});
        };
    }
  }

}());
