/**
 * @ngdoc controller
 * @name app.businessPartner.controller:BusinessPartner
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.businessPartner')
		.controller('BusinessPartner', BusinessPartner);

  /* @ngInject */
	function BusinessPartner(businessPartner,routing,crud){
		var vm = this;
        init();

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.businessPartner.controller:BusinessPartner
     * @description
     * My Description rules
     */
    function init(){
            routing.addRecentlyViewItems('Business Partner Directory');
            vm.selectedBPTypes = [];
            vm.selectedOrigin = [];
            vm.allBusinessPartner = {};
            vm.allBusinessPartner.data = [];
            vm.bpToRemove = [];
            vm.searchBusinessPartner = '';

            vm.onBpTypesSelectedChanged = onBpTypesSelectedChanged;
            vm.onCountrySelectedChanged = onCountrySelectedChanged;

            vm.allBusinessPartner.tableHeadings = [
                {name: 'Name'},
                {name:'Contact Person'},
                {name:'Origin'},
                {name:'Type'},
                {name:'Rating'},
                {name:'Last Transaction On'}
            ];
            vm.headerAnchor = [
                {
                    text: 'Add new Business Partner',
                    state: 'shell.businessPartner.addBusinessPartner({operation:'+ crud.CREATE +' })'
                }
            ];
            businessPartner.getBusinessPartnerList().then(function(response){
                if(response.data.success){
                    vm.allBusinessPartner.data = response.data.data;
                }
            });

            function onBpTypesSelectedChanged(selectedList){
                vm.selectedBPTypes = _.map(selectedList, 'model');
                filterChanged();
            }

            function onCountrySelectedChanged(selectedList){
                vm.selectedOrigin = _.map(selectedList, 'origin_name');
                filterChanged();
            }

            function filterChanged(){
                vm.bpToRemove = [];
                angular.forEach(vm.allBusinessPartner.data,function(bp,key){
                    var removeBp = false;
                    var bpShowByType = false;
                    angular.forEach(vm.selectedBPTypes,function(val){
                        bpShowByType = bpShowByType || (bp[val] === true);
                    });
                    removeBp = removeBp || ((vm.selectedOrigin.indexOf(bp.bp_country))<=-1);
                    if(removeBp ||!bpShowByType){
                        vm.bpToRemove.push(bp.bp_ID);
                    }
                });
            }
        }
	}

}());
