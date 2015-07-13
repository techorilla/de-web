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
	function AddBusinessPartner($scope,bpTypes,contractTypes, country){
		var vm = this;
        vm.accordianOneAtATime=true;
        vm.generalInfoOpen=true;
        vm.addressInfoOpen=false;
        vm.contactPersonInfoOpen=false;
        vm.evaluationNotesInfoOpen=false;
        vm.possibleBPTypes= bpTypes;
        vm.buyerContractTypes=contractTypes;
		vm.testFunction = testFunction;
        vm.businessPartner = {};
        vm.businessPartner.name='';
        vm.businessPartner.website='';
        vm.businessPartner.emails=[];
        vm.businessPartner.faxNumber='';
        vm.businessPartner.address=[];
        vm.businessPartner.contactPerson =[];
        vm.businessPartner.country = '';
        vm.businessPartner.creditRating = '';
        vm.addAddress = addAddress;
        vm.subAddress = subAddress;
        vm.addContactPerson = addContactPerson;
        vm.subContactPerson = subContactPerson;
        vm.saveBusinessPartner = saveBusinessPartner;

        vm.singleConfig = {
            valueField: 'code',
            labelField: 'name',
            options: country,
            sortField: 'name',
            maxItems: 1
        };
        console.log(vm.singleConfig);
    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.businessPartner.controller:AddBusinessPartner
     * @description
     * My Description rules
     */
    function bpAddress(line1,line2,zipCode,city,state){
            this.line1=line1 || '';
            this.line2=line2 || '';
            this.zipCode = zipCode || '';
            this.state = state || '';
            this.city = city || '';
        }
    function bpContactPerson(title,firstName,lastName, designation, contactNumbers, emails){
            this.title = title || '';
            this.firstName= firstName || '';
            this.lastName = lastName || '';
            this.designation = designation || '';
            this.contactNumbers = contactNumbers || '';
            this.emails = emails || '';
        }
    function phoneNumber(number,type){
            this.number = number;
            this.type = type;
        }
    function addAddress(){
            vm.businessPartner.address.push(new bpAddress());
        }
    function subAddress(){
            vm.businessPartner.address.pop();
        }
    function addContactPerson(){
            vm.businessPartner.contactPerson.push(new bpContactPerson());
        }
    function subContactPerson(){
            vm.businessPartner.contactPerson.pop();
        }
    function testFunction(num){
			console.info('This is a test function');
		}
    function saveBusinessPartner(){
            console.log(vm.businessPartner);
        }
	}

}());
