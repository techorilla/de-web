/**
 * @ngdoc controller
 * @name app.businessPartner.controller:AddBusinessPartner
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.businessPartner')
		.controller('AddBusinessPartner', AddBusinessPartner);

  /* @ngInject */
	function AddBusinessPartner(toastr,$scope,bpTypes,contractTypes, country, tabFilter, $q, modalFactory, businessPartner, $state){
		var vm = this;
        vm.country = country;
        vm.possibleBPTypes= bpTypes;
        vm.buyerContractTypes=contractTypes;
        vm.businessPartner = {};
        vm.businessPartner.products = [];
        vm.businessPartner.general = {
            bp_Name:'',
            bp_website:'',
            bp_isBuyer:false,
            bp_isSupplier:false,
            bp_isBroker:false,
            bp_isShipper:false,
            bp_onDoniContact:false,
            bp_credibilityIndex:0,
            bp_country:'',
            bp_address: ''
        };
        vm.saveBusinessPartner = saveBusinessPartner;

        function saveBusinessPartner(){
            if(!vm.businessPartnerForm.$invalid){
                var bp = vm.businessPartner.general;
                if(!(bp.bp_isBroker || bp.bp_isShipper || bp.bp_isBuyer || bp.bp_isSupplier)){
                    toastr.error('Business partner should have one type', 'Error');
                    return;
                }
                businessPartner.addBusinessPartner(vm.businessPartner.general,function(response){

                    if (response.success) {
                        toastr.success(response.message, 'Success');
                        $state.go('shell.businessPartner.view',{id:response.data});
                    }
                    else{
                        toastr.error(response.message, 'Error');
                    }
                });
            }
            else{
                toastr.error("Incorrect fields entered", 'Error');
            }

        }



        vm.singleConfig = {
            valueField: 'text',
            labelField: 'text',
            options: vm.country,
            sortField: 'text',
            maxItems: 1
        };


    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.businessPartner.controller:AddBusinessPartner
     * @description
     * My Description rules
     */
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

    function addContactPerson(){
            vm.businessPartner.contactPerson.push({
                bp_cont_id:'',
                bp_ID:'',
                bp_Cont_IsPrimary:false,
                bp_Cont_Designation:'',
                bp_Cont_Email:'',
                bp_Cont_PrimaryNumber:'',
                bp_Cont_SecondaryNumber:''
            });
        }
    function subContactPerson(name,index){
            modalFactory.alertModal(name,'current business partner', 'Delete').then(function(res){
                if(res){
                    vm.businessPartner.contactPerson.splice(index,1);
                }
            });
        }

	}

}());
