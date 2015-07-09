/**
 * @ngdoc controller
 * @name app.businessPartner.controller:BusinessPartner
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.businessPartner')
		.controller('BusinessPartner', BusinessPartner);

  /* @ngInject */
	function BusinessPartner(){
		var vm = this;
        init();
		vm.testFunction = testFunction;

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.businessPartner.controller:BusinessPartner
     * @description
     * My Description rules
     */
    function init(){
            vm.headerAnchor = [
                {
                    text: 'Add new Business Partner',
                    state: 'shell.businessPartner.addBusinessPartner'
                }
            ];
            console.log("sdsd");

        }
    function testFunction(num){
			console.info('This is a test function');
		}
	}

}());
