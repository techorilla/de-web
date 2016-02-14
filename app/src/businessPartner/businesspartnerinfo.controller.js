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
	function BusinessPartnerInfo(modalFactory, country, businessPartner, $state,toastr, bp){
		var vm = this;
        vm.country = country;
        init();
        vm.addContactPerson = addContactPerson;
        vm.subContactPerson = subContactPerson;
        vm.deleteBusinessPartner = function(name, id){
            businessPartner.deleteBusinessPartner(name, id,function(response){
                if (response.success) {
                    toastr.success(response.message, 'Success');
                    $state.go('shell.businessPartner');
                }
                else{
                    toastr.error(response.message, 'Error');
                }
            });
        };

        vm.deleteBusinessPartnerContact = function(bpName,contactName,id,index){
            businessPartner.deleteBusinessPartnerContact(bpName,contactName, id,function(response){
                if (response.success) {
                    toastr.success(response.message, 'Success');
                    vm.businessPartner.contPers.splice(index,1);
                    if(vm.businessPartner.contPers.length === 0){
                        vm.addContactPerson();
                    }
                }
                else{
                    toastr.error(response.message, 'Error');
                }
            });
        };


        vm.deleteBusinessPartnerBankDetails = function(bpName, accountTitle, accountNumber, id, index){
            businessPartner.deleteBusinessPartnerBankDetail(bpName, accountTitle, accountNumber, id,function(response){
                if (response.success) {
                    toastr.success(response.message, 'Success');
                    vm.businessPartner.bank.splice(index,1);
                    if(vm.businessPartner.bank.length === 0){
                        vm.addBankDetails();
                    }
                }
                else{
                    toastr.error(response.message, 'Error');
                }
            });
        };




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
        vm.businessPartner = {};
        vm.singleConfig = {
            valueField: 'text',
            labelField: 'text',
            options: vm.country,
            sortField: 'text',
            maxItems: 1
        };



        vm.addContactPerson = addContactPerson;
        vm.subContactPerson = subContactPerson;
        vm.saveContactPerson = saveContactPerson;

        vm.addBankDetails = addBankDetails;
        vm.subBankDetails = subBankDetails;
        vm.saveBankDetails = saveBankDetails;

        vm.showContactForm = false;
        vm.showContactPersonForm = false;
        vm.showBankDetailForm = false;

        vm.loadProducts = function(query) {
            return tabFilter.getProductFilterForTagInput(query).then(function(res){
                return res.data;
            });

        };

        vm.businessPartner = bp;
        vm.showContactPersonForm = (vm.businessPartner.contPers.length === 0);
        if(vm.businessPartner.contPers.length === 0){
            addContactPerson();
        }
        if(vm.businessPartner.bank.length === 0){
            addBankDetails();
        }

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
                    subContactPerson();
                }
            });
        }
        else{
            toastr.error('Incomplete or invalid contact person form', "Error");
        }

    }

    function addContactPerson(){
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
         vm.businessPartner.newBankDetails = {
             bankName:'',
             accountTitle:'',
             accountNumber:'',
             accountCountry:'',
             branchAddress:''
         };
         vm.showBankDetailForm = true;
    }
    function subBankDetails(){
        vm.businessPartner.newBankDetails = {};
        vm.showBankDetailForm = false;
    }

    function saveBankDetails(name,index){
        if(vm.bankDetailsForm.$valid){
            vm.businessPartner.newBankDetails.bp_ID = vm.businessPartner.gen[0].bp_ID;
            businessPartner.addNewBankAccount(vm.businessPartner.newBankDetails).then(function(res){

                if (res.data.success) {
                    vm.businessPartner.bank.push(vm.businessPartner.newBankDetails);
                    subContactPerson();
                    toastr.success(res.data.message, 'Success');
                }
                else{
                    toastr.error(res.data.message, 'Error');
                }
            });
        }
        else{
            toastr.error('Incomplete or invalid bank account form', "Error");
        }
    }








	}

}());
