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
    function TransactionCommission(tradebook, brokersList,$rootScope, $stateParams, toastr,crud, bpConfig,staticDropDown, $scope,appEvents){
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
            vm.initializeCommission = initializeCommission;
            vm.initializeCommission();
            vm.brokersList = brokersList;
            vm.commissionTypeConfig = tradebook.getCommissionTypeConfig(staticDropDown.commissionType);
            vm.showCommission = false;
            vm.saveCommission = saveCommission;
            vm.editCommission = editCommission;
            vm.commissionDetails.tr_transactionID = $stateParams.tran;
            vm.sellerBrokerChanged = sellerBrokerChanged;
            vm.buyerBrokerChanged = buyerBrokerChanged;
            vm.brokerInvolvedChanged = brokerInvolvedChanged;
            vm.editMode = true;
            $scope.$on(appEvents.TransactionBasicChanged,function(){
                tradebook.calculateCommission(vm.commissionDetails,vm.basicTransaction);
                saveCommission(true);
            });

            $scope.$watch('vm.commissionDetails', function(newVal, oldVal){
                if((newVal !== oldVal) && vm.editMode){
                    tradebook.calculateCommission(newVal,vm.basicTransaction);
                }

            }, true);

        }

        function brokerInvolvedChanged(val){
            if(!val){
                vm.commissionDetails.tr_sellerBroker = false;
                vm.commissionDetails.tr_buyerBroker = false;

                sellerBrokerChanged(false);
                buyerBrokerChanged(false);
            }
        }

        function sellerBrokerChanged(val){
            if(!val){
                vm.commissionDetails.tr_sellerBrokerID = null;
            }
        }

        function buyerBrokerChanged(val){
            if(!val){
                vm.commissionDetails.tr_buyerBrokerID = null;
                vm.commissionDetails.tr_buyerBroker_comm = 0;
            }
        }

        function initializeCommission(){
            vm.tran = $stateParams.tran;
            vm.commissionDetails = tradebook.getNewTransactionCommission();
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
                        vm.basicTransaction = tradebook.getTransactionBasic();
                    }
                }
            );
        }

        function saveCommission(isUpdate){
            if($stateParams.tran !== 'new'){
                var op = (vm.commissionDetails.tr_createdBy || isUpdate) ? true : false;

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
