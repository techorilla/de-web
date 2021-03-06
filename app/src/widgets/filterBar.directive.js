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
                    'Today': [moment().startOf('day'), moment().endOf('day').subtract(1, 'seconds')],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(7, 'days'), moment()],
                    'Last 2 Weeks': [moment().subtract(14,'days').startOf('day'),moment().endOf('day')],
                    'Last 30 Days': [moment().subtract(30, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment()],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                    'This Year': [moment().startOf('year'), moment()],
                    'Last 1 Year': [moment().subtract(1, 'year'),moment()]
        };
        scope.seperator = ' to ';
        scope.datePickerChanged = function(dateRange){
            scope.onDateChange({dateRange: dateRange});
        };
    }
  }

}());
