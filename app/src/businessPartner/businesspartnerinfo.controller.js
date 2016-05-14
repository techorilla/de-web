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
    function BusinessPartnerInfo(routing,modalFactory, originConfig, businessPartner, $state,toastr, bp, crud, navigation){
        var vm = this;
        init();





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
            vm.singleConfig = originConfig;

            vm.editBusinessPartnerBasic = editBusinessPartnerBasic;
            vm.addContactPerson = addContactPerson;
            vm.subContactPerson = subContactPerson;
            vm.saveContactPerson = saveContactPerson;

            vm.addBankDetails = addBankDetails;
            vm.subBankDetails = subBankDetails;
            vm.saveBankDetails = saveBankDetails;

            vm.addContactPerson = addContactPerson;
            vm.subContactPerson = subContactPerson;

            vm.businessPartner = bp;
            routing.addRecentlyViewItems(vm.businessPartner.gen[0].bp_Name);
            vm.showContactForm = false;
            vm.showContactPersonForm = false;
            vm.showBankDetailForm = false;

            vm.loadProducts = loadProducts;
            vm.deleteBusinessPartner = deleteBusinessPartner;
            vm.deleteBusinessPartnerContact = deleteBusinessPartnerContact;
            vm.deleteBusinessPartnerBankDetails = deleteBusinessPartnerBankDetails;


            vm.showContactPersonForm = (vm.businessPartner.contPers.length === 0);
            if(vm.businessPartner.contPers.length === 0){
                addContactPerson();
            }
            if(vm.businessPartner.bank.length === 0){
                addBankDetails();
            }

        }

        function loadProducts(query){
            return tabFilter.getProductFilterForTagInput(query).then(function(res){
                return res.data;
            });
        }

        function deleteBusinessPartner(name, id){
            businessPartner.deleteBusinessPartner(name, id,function(response){
                if (response.success) {
                    $state.go('shell.businessPartner');
                }
            });
        }

        function deleteBusinessPartnerContact(bpName,contactName,id,index){
            businessPartner.deleteBusinessPartnerContact(bpName,contactName, id,function(response){
                if (response.success) {
                    vm.businessPartner.contPers.splice(index,1);
                    if(vm.businessPartner.contPers.length === 0){
                        vm.addContactPerson();
                    }
                }
            });
        }


        function deleteBusinessPartnerBankDetails(bpName, accountTitle, accountNumber, id, index){
            businessPartner.deleteBusinessPartnerBankDetail(bpName, accountTitle, accountNumber, id,function(response){
                if (response.success) {
                    vm.businessPartner.bank.splice(index,1);
                    if(vm.businessPartner.bank.length === 0){
                        subBankDetails();
                        vm.addBankDetails();
                    }
                }
            });
        }

        function saveContactPerson(){
            if(vm.contactPersonForm.$valid){
                vm.businessPartner.newContactPerson.bp_ID = vm.businessPartner.gen[0].bp_ID;
                businessPartner.addNewBusinessPartnerContact(vm.businessPartner.newContactPerson).then(function(res){

                    if (res.data.success) {
                        vm.businessPartner.newContactPerson.bp_Cont_designation = vm.businessPartner.newContactPerson.bp_Cont_Designation;
                        vm.businessPartner.newContactPerson.bp_cont_ID = res.data.conPerId;
                        vm.businessPartner.newContactPerson.bp_Cont_SecondryNumber = vm.businessPartner.newContactPerson.bp_Cont_SecondaryNumber;

                        vm.businessPartner.contPers.push(vm.businessPartner.newContactPerson);
                        subContactPerson();
                    }
                    else{
                        subContactPerson();
                    }
                });
            }
            else{
                toastr.error('Incomplete or invalid contact person form', "Error");
            }

        }

        function editBusinessPartnerBasic(){
            businessPartner.setBusinessPartner(vm.businessPartner);
            $state.go('shell.businessPartner.addBusinessPartner',{operation: crud.UPDATE, id:vm.businessPartner.gen[0].bp_ID});
        }

        function addContactPerson(){
            vm.businessPartner.newContactPerson = {
                bp_cont_id:'',
                bp_ID:'',
                bp_Cont_IsPrimary:false,
                bp_Cont_Designation:'',
                bp_Cont_Email:'',
                bp_Cont_PrimaryNumber:'',
                bp_Cont_SecondaryNumber:'',
                bp_Cont_fullName:''
            };
            vm.showContactPersonForm = true;
        }

        function subContactPerson(){
            vm.businessPartner.newContactPerson = {};
            vm.showContactPersonForm = false;
            navigation.resetFormValidation(vm.contactPersonForm);
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
            navigation.resetFormValidation(vm.bankDetailsForm);
        }

        function saveBankDetails(name,index){
            if(vm.bankDetailsForm.$valid){
                vm.businessPartner.newBankDetails.bp_ID = vm.businessPartner.gen[0].bp_ID;
                businessPartner.addNewBankAccount(vm.businessPartner.newBankDetails).then(function(res){
                    if (res.data.success) {
                        vm.businessPartner.newBankDetails.bankDetails_ID = res.data.bankId;
                        vm.businessPartner.bank.push(vm.businessPartner.newBankDetails);
                        subBankDetails();
                    }
                });
            }
            else{
                toastr.error('Incomplete or invalid bank account form', "Error");
            }
        }
    }

}());
