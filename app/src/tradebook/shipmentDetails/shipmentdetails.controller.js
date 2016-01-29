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
            if(vm.newShip){
                tradebook.transactionShipmentCrud(vm.shipment, crud.CREATE).then();
            }
            else{
                tradebook.transactionShipmentCrud(vm.shipment, crud.UPDATE).then();
            }

        }

        function getStateParams(){
            vm.tran = $stateParams.tran;
            if(vm.tran!=='new'){
                tradebook.getSingleTransactionShipment(vm.tran).then(function(res){
                    if(res.data.success){
                        vm.shipment=res.data.shipment;
                        if(vm.shipment.length>0){
                           vm.shipment = vm.shipment[0];
                           vm.editMode = false;
                           vm.newShip = false;
                        }
                        else{
                            vm.shipment = tradebook.getNewShipmentDetails(vm.tran);
                            vm.editMode = true;
                            vm.newShip = true;
                        }
                    }
                    else{
                        toastr.error(res.data.message, 'Error');
                        vm.editMode = false;
                    }
                });
            }
        }

        function editShipmentDetails(){
            vm.editMode=true;
            vm.tempShipment = angular.copy(vm.shipment);
        }

        function cancelShipmentDetails(){
            vm.editMode=false;
        }
	}

}());
