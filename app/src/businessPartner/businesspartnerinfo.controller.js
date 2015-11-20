/**
 * @ngdoc controller
 * @name app.businessPartner.controller:BusinessPartnerInfo
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.businessPartner')
		.controller('BusinessPartnerInfo', BusinessPartnerInfo);

  /* @ngInject */
	function BusinessPartnerInfo(modalFactory, businessPartner, $state){
		var vm = this;
        init();
        vm.addContactPerson = addContactPerson;
        vm.subContactPerson = subContactPerson;

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.businessPartner.controller:BusinessPartnerInfo
     * @description
     * My Description rules
     */
    function init(){
        vm.businessPartner = {}
        vm.businessPartner.contactPerson = [];
        vm.loadProducts = function(query) {
            return tabFilter.getProductFilterForTagInput(query).then(function(res){
                console.log(res.data);
                return res.data;
            });

        };
        businessPartner.getBusinessPartnerComplete($state.params.id).then(function(res){
            vm.businessPartner = (res.data);
            console.log(vm.businessPartner);
        });
    }
    function addContactPerson(){
        vm.businessPartner.contactPerson.push({
            bp_cont_id:'',
            bp_ID:'',
            bp_Cont_IsPrimary:'',
            bp_Cont_Designation:'',
            bp_Cont_Email:'',
            bp_Cont_PrimaryNumber:'',
            bp_Cont_SecondaryNumber:'',
            bp_Cont_fullName:''
        });
    }
    function subContactPerson(name,index){
        modalFactory.alertModal(name,'current business partner', 'Delete').then(function(res){
            if(res){
                vm.businessPartner.contactPerson.splice(index,1);
            }
        });
    }
    function addBankDetails(){
         vm.businessPartner.bankDetails.push({text:'',state:'Add'});
    }
    function removeBankDetails(name,index){
         modalFactory.alertModal(name,'current business partner', 'Delete').then(function(res){
            if(res){
                vm.businessPartner.bankDetails.splice(index,1);
            }
         });
    }


	}

}());
