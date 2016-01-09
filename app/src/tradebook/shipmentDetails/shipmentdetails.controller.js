/**
 * @ngdoc controller
 * @name app.tradebook.controller:ShipmentDetails
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.tradebook')
		.controller('ShipmentDetails', ShipmentDetails);

  /* @ngInject */
	function ShipmentDetails(bpConfig,shippersList){
		var vm = this;
        init();

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.tradebook.controller:ShipmentDetails
     * @description
     * My Description rules
     */
        function init(){
            vm.bpConfig = bpConfig;
            vm.showShipment = false;
            vm.shippersList = shippersList;
            vm.addShipmentDetails = addShipmentDetails;

		}
        function addShipmentDetails(){
            tradebook.transactionSecondaryCrud()
        }
	}

}());
