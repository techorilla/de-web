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
	function AddBusinessPartner($scope,bpTypes,contractTypes, country, tabFilter, $q, modalFactory){
		var vm = this;
        vm.accordianOneAtATime=true;
        vm.generalInfoOpen=true;
        vm.addressInfoOpen=false;
        vm.contactPersonInfoOpen=false;
        vm.evaluationNotesInfoOpen=false;
        vm.BusinessPartnerProducts=[];
        vm.possibleBPTypes= bpTypes;
        vm.buyerContractTypes=contractTypes;
        vm.businessPartner = {};
        vm.businessPartner.general = {name:'',website:'',isBuyer:false,isSupplier:false,isBroker:false,isShipper:false,doniContact:false,rating:0};
        vm.businessPartner.bankDetails = [];
        vm.addAddress = addAddress;
        vm.subAddress = subAddress;
        vm.addContactPerson = addContactPerson;
        vm.subContactPerson = subContactPerson;
        vm.next = next;
        vm.prev = prev;
        vm.addBankDetails = addBankDetails;
        vm.country = country;
        vm.removeBankDetails = removeBankDetails;
        vm.goToProducts = goToProducts;

        function goToProducts(){
            if(vm.businessPartnerForm.$valid){
                vm.businessPartner.general.isBuyer = vm.possibleBPTypes[0].isChecked;
                vm.businessPartner.general.isSupplier = vm.possibleBPTypes[1].isChecked;
                vm.businessPartner.general.isBroker = vm.possibleBPTypes[2].isChecked;
                vm.businessPartner.general.isShipper = vm.possibleBPTypes[3].isChecked;
                console.log(vm.businessPartner);
                vm.next();
            }

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
            valueField: 'code',
            labelField: 'name',
            options: vm.country,
            sortField: 'name',
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
    function BpAddress(line1,line2,zipCode,city,state){
            this.line1=line1 || '';
            this.line2=line2 || '';
            this.zipCode = zipCode || '';
            this.state = state || '';
            this.city = city || '';
        }
    function BpContactPerson(details){
            this.title = details.title || '';
            this.firstName= details.firstName || '';
            this.lastName = details.lastName || '';
            this.designation = details.designation || '';
            this.contactNumbers = details.contactNumbers || '';
            this.emails = details.emails || '';
        }
    function addAddress(){
            vm.businessPartner.address.push(new BpAddress());
        }
    function subAddress(){
            vm.businessPartner.address.pop();
        }
    function addContactPerson(){
            vm.businessPartner.contactPerson.push(new BpContactPerson());
        }
    function subContactPerson(){
            vm.businessPartner.contactPerson.pop();
        }

	}

}());
