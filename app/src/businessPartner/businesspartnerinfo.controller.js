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
	function BusinessPartnerInfo(modalFactory, businessPartner, $state,toastr, $scope){
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

        vm.addContactPerson = addContactPerson;
        vm.subContactPerson = subContactPerson;
        vm.saveContactPerson = saveContactPerson;
        vm.showContactPersonForm = false;
        vm.loadProducts = function(query) {
            return tabFilter.getProductFilterForTagInput(query).then(function(res){
                return res.data;
            });

        };
        businessPartner.getBusinessPartnerComplete($state.params.id).then(function(res){
            vm.businessPartner = (res.data);
            vm.showContactPersonForm = (vm.businessPartner.contPers.length === 0);
            if(vm.businessPartner.contPers.length === 0){
                addContactPerson();
            }
        });

    }

    function saveContactPerson(){
        if(vm.contactPersonForm.$valid){
            vm.businessPartner.newContactPerson.bp_ID = vm.businessPartner.gen[0].bp_ID;
            businessPartner.addNewBusinessPartnerContact(vm.businessPartner.newContactPerson).then(function(res){

                if (res.data.success) {
                    vm.businessPartner.contPers.push(vm.businessPartner.newContactPerson);
                    subContactPerson();
                    toastr.success(res.data.message, 'Success');
                }
                else{
                    toastr.error(res.data.message, 'Error');
                }
            });
        }
        else{
            toastr.error('Incomplete or invalid contact person form', "Error");
        }

    }
    function addContactPerson(){
        console.log($scope);
        vm.businessPartner.newContactPerson = {
            bp_cont_id:'',
            bp_ID:'',
            bp_Cont_IsPrimary:'',
            bp_Cont_Designation:'',
            bp_Cont_Email:'',
            bp_Cont_PrimaryNumber:'',
            bp_Cont_SecondaryNumber:'',
            bp_Cont_fullName:''
        };
        vm.showContactPersonForm = true;
    }
    function subContactPerson(){
//        modalFactory.alertModal(name,'current business partner', 'Delete').then(function(res){
//            if(res){
//                vm.businessPartner.contactPerson.splice(index,1);
//            }
//        });
        vm.businessPartner.newContactPerson = {};
        vm.showContactPersonForm = false;

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
