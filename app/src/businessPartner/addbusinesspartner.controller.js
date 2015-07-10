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
	function AddBusinessPartner(){
		var vm = this;
        vm.accordianOneAtATime=true;
        vm.generalInfoOpen=true;
        vm.addressInfoOpen=false;
        vm.contactPersonInfoOpen=false;
        vm.evaluationNotesInfoOpen=false;

		vm.testFunction = testFunction;

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.businessPartner.controller:AddBusinessPartner
     * @description
     * My Description rules
     */
    function testFunction(num){
			console.info('This is a test function');
		}
	}

}());
