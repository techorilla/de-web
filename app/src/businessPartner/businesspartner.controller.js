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
	function BusinessPartner(businessPartner,toastr,crud){
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
            vm.headerAnchor = [
                {
                    text: 'Add new Business Partner',
                    state: 'shell.businessPartner.addBusinessPartner({operation:'+ crud.CREATE +' })'
                }
            ];
            
            vm.allBusinessPartner = {};
            vm.allBusinessPartner.data = [];
            vm.searchBusinessPartner = '';
            vm.allBusinessPartner.tableHeadings = [
                {name: 'Name'},{name:'Contact Person'},{name:'Origin'},{name:'Type'},{name:'Rating'},{name:'Last Transaction On'}
            ];
            businessPartner.getBusinessPartnerList().then(function(response){
                if(response.data.success){
                    vm.allBusinessPartner.data = response.data.data;
                }
                else{
                    toastr.error(response.data.message);
                }
            });

        }
	}

}());
