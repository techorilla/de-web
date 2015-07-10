/**
 * @ngdoc directive
 * @name app.widgets.directive:customFilter
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
    .directive('customFilter', customFilter);

  /* @ngInject */
  function customFilter(tabFilter){

    return {
      link: link,
      restrict: 'E',
      templateUrl: 'src/widgets/customFilter.template.html',
      scope: {
        filterType: '@'
      },
      replace:true
    };

    /////////////////////

    function link(scope, elem, attrs){
      scope.showOptions = false;
      scope.dropDownValues={};
      scope.invertShowOptions = function(){
        scope.showOptions = !scope.showOptions;
      }
      if(scope.filterType==='product'){
          scope.title= 'Product';
          tabFilter.getProductFilter().then(function(res){
            scope.dropDownValues = res.data.products;
        });
      }
      if(scope.filterType==='buyer'){
          scope.title= 'Buyer';
          tabFilter.getBuyerFilter().then(function(res){
            scope.dropDownValues = res.data.buyer;
        });
      }
      if(scope.filterType==='seller'){
          scope.title='Seller';
          tabFilter.getSellerFilter().then(function(res){
            scope.dropDownValues = res.data.seller;
        });
      }
      if(scope.filterType==='bpTypes'){
          scope.title= 'Business Partner Type';
          tabFilter.getBusinessPartnerTypes().then(function(res){
              scope.dropDownValues = res.data.bpTypes;
          });
      }
      if(scope.filterType==='tranStatus'){
          scope.title='Transaction Status';
          tabFilter.getTransactionStatus().then(function(res){
              scope.dropDownValues = res.data.status;
          });

      }
    }
  }

}());
