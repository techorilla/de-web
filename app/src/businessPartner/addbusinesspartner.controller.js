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
        vm.country = country;

        vm.singleConfig = {
            valueField: 'code',
            labelField: 'name',
            options: vm.country,
            sortField: 'name',
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
    function saveBusinessPartner(){

        }
	}

}());
