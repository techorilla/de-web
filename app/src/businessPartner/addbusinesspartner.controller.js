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
	function AddBusinessPartner(toastr,$scope,bpTypes,contractTypes, country, tabFilter, $q, modalFactory, businessPartner){
		var vm = this;

        vm.possibleBPTypes= bpTypes;
        vm.buyerContractTypes=contractTypes;
        vm.businessPartner = {};
        vm.businessPartner.products = [];
        vm.businessPartner.general = {name:'',website:'',isBuyer:false,isSupplier:false,isBroker:false,isShipper:false,doniContact:false,rating:0,doniContract:false};
        vm.businessPartner.contactDetails = {origin:'',emails:[],faxNumbers:[],phoneNumbers:[], address:''};
        vm.businessPartner.bankDetails = [];
        vm.businessPartner.contactPerson = [];
        vm.country = country;

        vm.addBankDetails = addBankDetails;
        vm.removeBankDetails = removeBankDetails;
        vm.addContactPerson = addContactPerson;
        vm.subContactPerson = subContactPerson;

        vm.next = next;
        vm.prev = prev;
        vm.goToProducts = goToProducts;
        vm.goToContactDetails = goToContactDetails;
        vm.goToBankDetails = goToBankDetails;
        vm.goToContactPerson = goToContactPerson;
        vm.goToPreview = goToPreview;
        vm.saveBusinessPartner = saveBusinessPartner;

        function saveBusinessPartner(){
            businessPartner.addBusinessPartner(vm.businessPartner,function(response){
                if (response.success) {
                    toastr.success(response.message, 'Success');
                    $state.go('shell.businessPartner');
                }
                else{
                    toastr.error(response.message, 'Error');
                }
            });

        }

        function goToPreview(){
            if(vm.businessPartner.contactPerson.length === 0 ){
                toastr.warning('No contact person for business partner is provided','Warning');
                vm.next();
            }
            else{
                if(vm.contactPersonForm.$valid) {
                    vm.next();
                }
                else{
                    toastr.error('Some contact person information is missing or invalid','Incomplete Form');
                }
            }
        }

        function goToContactPerson(){
            var empty = _.where(vm.businessPartner.bankDetails, { 'text': ''});
            angular.forEach(empty, function(val){
                var i = vm.businessPartner.bankDetails.indexOf(val);
                vm.businessPartner.bankDetails.splice(i,1);
            });
            if(vm.businessPartner.bankDetails.length === 0){
                toastr.warning('No bank details provided','Warning');
            }
            vm.next();
        }

        function goToBankDetails(){
            if(vm.businessPartner.contactDetails.origin === ''){
                toastr.error('Please provide a origin for business partner', 'Missing Origin');
            }
            else{
                vm.next();
            }
        }

        function goToProducts(){
            if(vm.businessPartnerForm.$valid){
                vm.businessPartner.general.isBuyer = vm.possibleBPTypes[0].isChecked;
                vm.businessPartner.general.isSupplier = vm.possibleBPTypes[1].isChecked;
                vm.businessPartner.general.isBroker = vm.possibleBPTypes[2].isChecked;
                vm.businessPartner.general.isShipper = vm.possibleBPTypes[3].isChecked;
                if(vm.businessPartner.general.isBuyer || vm.businessPartner.general.isSupplier ||
                    vm.businessPartner.general.isBroker ||vm.businessPartner.general.isShipper
                  ){ vm.next();}
                else{
                    toastr.error('Atleast one type should be added for business partner', 'No Type Provided');
                    return;
                }

            }

        }

        function goToContactDetails(){
            console.log(vm.businessPartner.products);
            if(vm.businessPartner.products.length === 0){
                toastr.warning('Warning', 'No products have been added for business partner')
            }
            vm.next();
        }

        function next(){
            var i = vm.currentStep;
            if(i<vm.steps.length){
                vm.steps[i].isActive = false;
                vm.steps[i+1].isActive = true;
                vm.currentStep += 1;
            }

        }

        function prev(){
            var i = vm.currentStep;
            if(i>0){
                vm.steps[i].isActive = false;
                vm.steps[i-1].isActive = true;
                vm.currentStep -= 1;
            }
        }

        vm.steps = [
            {
                step: 1,
                caption: "Basic Information",
                isActive: true
            },
            {
                step: 2,
                caption: "Product",
                isActive: false
            },
            {
                step: 3,
                caption: "Contact Details",
                isActive: false
            },
            {
                step: 4,
                caption: "Bank Details",
                isActive: false
            },
            {
                step: 5,
                caption: "Contact Person",
                isActive: false
            },
            {
                step:6,
                caption: "Preview",
                isActive: false
            }
        ];

        vm.currentStep = 0;

        vm.singleConfig = {
            valueField: 'text',
            labelField: 'text',
            options: vm.country,
            sortField: 'text',
            maxItems: 1
        };

        vm.loadProducts = function(query) {
            console.log(query);
            return tabFilter.getProductFilterForTagInput(query).then(function(res){
                console.log(res.data);
                return res.data;
            });
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
                fullName:'',
                isPrimary: false,
                email:'',
                phoneNumber1:'',
                phoneNumber2:'',
                role:''
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
