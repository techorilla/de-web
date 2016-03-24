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
    function customFilter(tabFilter, product,tradebook){

        return {
            link: link,
            restrict: 'E',
            templateUrl: 'src/widgets/customFilter.template.html',
            scope: {
                filterType: '@',
                selectedValues: '@',
                onSelectedValuesChanged:'&'
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
            scope.onSingleSelectChange = onSingleSelectChange;
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
                    scope.onSelectedValuesChanged({selectedList:scope.selectedValues});
                }

            };
            if(scope.filterType==='product'){
                scope.title= 'Product';
                product.getAllProducts().then(function(res){
                    scope.dropDownValues = res.data;
                    scope.selectedValues = angular.copy(scope.dropDownValues);
                    scope.onSelectedValuesChanged({selectedList:scope.selectedValues});
                });

            }
            if(scope.filterType==='buyer'){
                scope.title= 'Buyer';
                tabFilter.getDropDownBP(scope.title).then(function(res){
                    scope.dropDownValues = res.data.data;
                    scope.selectedValues = angular.copy(scope.dropDownValues);
                    scope.onSelectedValuesChanged({selectedList:scope.selectedValues});
                });
            }
            if(scope.filterType==='seller'){
                scope.title='Seller';
                tabFilter.getDropDownBP(scope.title).then(function(res){
                    scope.dropDownValues = res.data.data;
                    scope.selectedValues = angular.copy(scope.dropDownValues);
                    scope.onSelectedValuesChanged({selectedList:scope.selectedValues});
                });
            }
            if(scope.filterType==='broker'){
                scope.title='broker';
                tabFilter.getDropDownBP(scope.title).then(function(res){
                    scope.dropDownValues = res.data.data;
                    scope.selectedValues = angular.copy(scope.dropDownValues);
                    scope.onSelectedValuesChanged({selectedList:scope.selectedValues});
                });
            }
            if(scope.filterType==='shipper'){
                scope.title='shipper';
                tabFilter.getDropDownBP(scope.title).then(function(res){
                    scope.dropDownValues = res.data;
                    scope.selectedValues = angular.copy(scope.dropDownValues);
                    scope.onSelectedValuesChanged({selectedList:scope.selectedValues});
                });
            }
            if(scope.filterType==='bpTypes'){
                scope.title= 'Business Partner Type';
                tabFilter.getBusinessPartnerTypes().then(function(res){
                    scope.dropDownValues = res.data.bpTypes;
                    scope.selectedValues = angular.copy(scope.dropDownValues);
                    scope.onSelectedValuesChanged({selectedList:scope.selectedValues});
                });
            }
            if(scope.filterType==='tranStatus'){
                scope.title='Transaction Status';
                tradebook.getStaticDropDown().then(function (res) {
                    scope.dropDownValues =  res.data.transactionStatus;
                    scope.dropDownValues.unshift({"value":scope.dropDownValues.length,"text":"Not Entered"});
                    scope.selectedValues = angular.copy(scope.dropDownValues);
                    scope.onSelectedValuesChanged({selectedList:scope.selectedValues});
                });
            }
            if(scope.filterType==='country'){
                scope.title='Country';
                tabFilter.getAllCountries().then(function (res) {
                    scope.dropDownValues =  res.data.origins;
                    scope.selectedValues = angular.copy(scope.dropDownValues);
                    scope.onSelectedValuesChanged({selectedList:scope.selectedValues});
                });
            }

            function onSelectAll(selectAll){
                if(selectAll){
                    angular.forEach(scope.dropDownValues,function(val,key){
                        val.selected = true;
                    });
                    scope.selectedValues = angular.copy(scope.dropDownValues);
                }
                else{
                    scope.selectedValues = [];
                    angular.forEach(scope.dropDownValues,function(val,key){
                        val.selected = false;
                    });
                }
            }

            function onSingleSelectChange(value,change,property){
                scope.selectAll = false;
                if(change){
                    scope.selectedValues.push(value);
                }
                else{
                    _.remove(scope.selectedValues, function(obj){
                        return (obj[property]==value[property]);
                    });
                }
            }

        }
    }

}());
