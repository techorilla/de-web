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
  function customFilter(tabFilter, product){

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
      scope.dropDownCallBack = function(res){
          if(res.success === false ){
              toastr.error(res.message,'Error '+bpType);
          }
      };
      scope.onSelectAll = onSelectAll;
      scope.selectAll = true;
      scope.showOptions = false;
      scope.dropDownValues={};
      scope.textFilter = '';
      scope.selectedValues = [];
      scope.invertShowOptions = function(){
        scope.showOptions = !scope.showOptions;
      };
      scope.closeFilter = function(){
          if(scope.showOptions){
              scope.showOptions = false;
          }

      };
      if(scope.filterType==='product'){
          scope.title= 'Product';
          product.getAllProducts().then(function(res){
              scope.dropDownValues = res.data;
              scope.selectedValues = scope.dropDownValues;
          });

      }
      if(scope.filterType==='buyer'){
          scope.title= 'Buyer';
          tabFilter.getDropDownBP(scope.title).then(function(res){
            scope.dropDownValues = res.data.data;
            scope.selectedValues = scope.dropDownValues;
        });
      }
      if(scope.filterType==='seller'){
          scope.title='Seller';
          tabFilter.getDropDownBP(scope.title).then(function(res){
            scope.dropDownValues = res.data.data;
            scope.selectedValues = scope.dropDownValues;
          });
      }
      if(scope.filterType==='broker'){
        scope.title='broker';
        tabFilter.getDropDownBP(scope.title).then(function(res){
            scope.dropDownValues = res.data.data;
            scope.selectedValues = scope.dropDownValues;
        });
      }
      if(scope.filterType==='shipper'){
        scope.title='shipper';
        tabFilter.getDropDownBP(scope.title).then(function(res){
            scope.dropDownValues = res.data;
            scope.selectedValues = scope.dropDownValues;
        });
      }
      if(scope.filterType==='bpTypes'){
          scope.title= 'Business Partner Type';
          tabFilter.getBusinessPartnerTypes().then(function(res){
              scope.dropDownValues = res.data.bpTypes;
              scope.selectedValues = scope.dropDownValues;
          });
      }
      if(scope.filterType==='tranStatus'){
          scope.title='Transaction Status';
          tabFilter.getTransactionStatus().then(function(res){
              scope.dropDownValues = res.data.status;
              scope.selectedValues = scope.dropDownValues;
          });
      }
      if(scope.filterType==='country'){
        scope.title='Country';
        tabFilter.getAllCountries().then(function (res) {
            scope.dropDownValues =  res.data.origins;
            scope.selectedValues = scope.dropDownValues;
        });
      }

      function onSelectAll(selectAll){
          if(selectAll){
              scope.selectedValues = scope.dropDownValues;
              angular.forEach(scope.dropDownValues,function(val,key){
                  val.selected = true;
              });
          }
          else{
              scope.selectedValues = [];
              angular.forEach(scope.dropDownValues,function(val,key){
                 val.selected = false;
              });
          }
      }
    }
  }

}());
