/**
 * @ngdoc controller
 * @name app.tradebook.controller:TransactionCommission
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.tradebook')
		.controller('TransactionCommission', TransactionCommission);

  /* @ngInject */
	function TransactionCommission(tradebook, $stateParams, toastr,crud, bpConfig, tabFilter, staticDropDown, $scope){
		var vm = this;
        init();

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.tradebook.controller:TransactionCommission
     * @description
     * My Description rules
     */

        function init(){
            vm.bpConfig = bpConfig;
            vm.initializeCommission = initializeCommission();
            tabFilter.getDropDownBP("Broker").then(function(res){
                vm.brokersList = res.data.data;
            });
            vm.commissionTypeConfig = tradebook.getCommissionTypeConfig(staticDropDown.commissionType);
            vm.showCommission = false;
            vm.saveCommission = saveCommission;
            vm.editCommission = editCommission;

            vm.commissionDetails.tr_transactionID = $stateParams.tran;
            vm.editMode = true;

            $scope.$watch('vm.commissionDetails', function(newVal, oldVal){
                console.log(newVal);
                if((newVal !== oldVal) && vm.editMode){
                    var type = newVal.tr_ownCommissionType;
                    var price = newVal.price;
                    var quantity = newVal.quantity;
                    var comm =  newVal.tr_own_Commission;
                    var commIntoPrice = 0;
                    var brokerCommType = newVal.tr_buyerBroker_comm_type;
                    var brokerIntoPrice = 0;
                    var bComm = newVal.tr_buyerBroker_comm;
                    if(type !== ''){
                        if(type === 'Fixed'){
                            commIntoPrice = (comm);
                        }
                        else if(type==='Percentage'){
                            commIntoPrice = (comm/100)*price;
                        }
                    }
                    if(brokerCommType!==''){
                        if(brokerCommType==='Fixed'){
                            brokerIntoPrice = bComm;
                        }
                        else if(brokerCommType==='Percentage'){
                            brokerIntoPrice = (bComm/100)*price;
                        }
                    }

                    var tr_netCommission = (((commIntoPrice - brokerIntoPrice) + newVal.tr_difference )- newVal.tr_discount);
                    console.log(vm.commissionDetails);
                    vm.commissionDetails.tr_netCommission = tr_netCommission * quantity;
                }

            }, true);

        }

        function initializeCommission(){
            vm.tran = $stateParams.tran;
            vm.commissionDetails = tradebook.getNewTransactionCommission();
            if(vm.tran !== 'new'){
                tradebook.getSingleTransactionCommission($stateParams.tran).then(
                    function(res){
                        if(res.data.success){
                            if(res.data.commission.length !== 0){
                                vm.editMode = false;
                                vm.commissionDetails = res.data.commission[0];
                            }
                            else{
                                vm.commissionDetails.tr_transactionID = $stateParams.tran;
                            }
                        }
                    }
                );
                vm.commissionDetails.price = ($scope.vm.newTransaction.tr_price);
                vm.commissionDetails.quantity = $scope.vm.newTransaction.tr_quantity;

            }
        }

        function saveCommission(){
            if($stateParams.tran !== 'new'){
                var op = (vm.commissionDetails.tr_createdBy) ? true : false;

                if(!op){
                    tradebook.transactionCommissionCrud(vm.commissionDetails,crud.CREATE).then(function(res){
                        if(res.data.success){
                            vm.editMode = false;
                            vm.commissionDetails.tr_createdBy = 'Created';
                            toastr.success('','Transaction commission added.')

                        }
                    });
                }
                else{
                    tradebook.transactionCommissionCrud(vm.commissionDetails,crud.UPDATE).then(function(res){
                        if(res.data.success){
                            vm.editMode = false;
                            toastr.success('','Transaction commission updated.')

                        }
                    });
                }

            }
            else{
                toast.error('Add/Save Basic Transaction Info First','Error');
                return;
            }
        }

        function editCommission(){
            vm.editMode = true;
            vm.commTemp= angular.copy(vm.newTransaction);
        }


	}

}());
