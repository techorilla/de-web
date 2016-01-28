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
	function ShipmentDetails(bpConfig,shippersList, toastr, crud, $stateParams, tradebook){
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
            vm.tran = $stateParams.tran;
            vm.bpConfig = bpConfig;
            vm.showShipment = false;
            vm.shippersList = shippersList;
            vm.saveShipmentDetails = saveShipmentDetails;
            vm.editShipmentDetails = editShipmentDetails;
            vm.cancelShipmentDetails = cancelShipmentDetails;
            vm.editMode = true;
            vm.getStateParams = getStateParams;

		}
        function saveShipmentDetails(){
            tradebook.transactionSecondaryCrud();
        }

        function getStateParams(){
            vm.tran = $stateParams.tran;
            if(vm.tran==='new'){
                vm.shipment = tradebook.getNewShipmentDetails();
            }
        }

        function editShipmentDetails(){

        }

        function cancelShipmentDetails(){

        }
	}

}());
