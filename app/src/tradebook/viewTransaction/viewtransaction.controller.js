/**
 * @ngdoc controller
 * @name app.tradebook.controller:ViewTransaction
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.tradebook')
		.controller('ViewTransaction', ViewTransaction);

  /* @ngInject */
	function ViewTransaction(tradebook,$stateParams){
		var vm = this;
        init();
        function init(){
            console.log($stateParams.id);
            vm.showBroker = false;
            vm.datePickerOpened = false;
            vm.datePickerOpened2 = false;
            vm.showTransactionInfo=false;
            vm.showContractInfo=false;
            vm.showCommission = false;
            vm.showStatus = false;
            vm.showShipment = false;
            vm.showDocument = false;
            vm.showNotes = false;
            tradebook.getSingleTransactionDetails($stateParams.id).then(function(res){
               vm.transaction = res.data.transaction[0];
               console.log(res);
            });
        }

		vm.testFunction = testFunction;

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.tradebook.controller:ViewTransaction
     * @description
     * My Description rules
     */
    function testFunction(num){
			console.info('This is a test function');
		}
	}

}());
