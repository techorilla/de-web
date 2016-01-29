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
            vm.getStateParams();
            vm.resetBoolean = resetBoolean;
            vm.resetFields = resetFields;
		}

        function resetBoolean(value,booleans,fields){
            if(!value){
                angular.forEach(booleans,function(val,key){
                   vm.shipment[val] = false;
                });
                angular.forEach(fields,function(val,key){
                    vm.shipment[val] = null;
                });
            }
        }

        function resetFields(value,fields){
            if(!value){
                angular.forEach(fields,function(val,key){
                    vm.shipment[val] = null;
                });
            }
        }

        function saveShipmentDetails(){
            if(vm.newShip){
                if(vm.shipment == tradebook.getNewShipmentDetails(vm.tran)){
                    toastr.error('Empty form can not be saved', "Error");
                    return;
                }
                tradebook.transactionShipmentCrud(vm.shipment, crud.CREATE).then(
                    function(res){
                        if(res.data.success){
                            vm.editMode = false;
                            toastr.success(res.data.message,'Success');
                        }
                        else{
                            toastr.error(res.data.message,'Success');
                        }
                    }
                );
            }
            else{
                tradebook.transactionShipmentCrud(vm.shipment, crud.UPDATE).then(
                    function(res){
                        if(res.data.success){
                            vm.editMode = false;
                            vm.newShip = false;
                            toastr.success(res.data.message,'Success');
                        }
                        else{
                            toast.error(res.data.message,'Success');
                        }
                    }
                );
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
            vm.shipment = vm.tempShipment;
            vm.editMode=false;
        }
	}

}());
