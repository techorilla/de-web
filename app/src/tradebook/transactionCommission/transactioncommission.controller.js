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
        var tc = this;
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
            tc.bpConfig = bpConfig;
            tc.initializeCommission = initializeCommission;
            tc.initializeCommission();
            tc.brokersList = brokersList;
            tc.commissionTypeConfig = tradebook.getCommissionTypeConfig(staticDropDown.commissionType);
            tc.showCommission = false;
            tc.saveCommission = saveCommission;
            tc.editCommission = editCommission;
            tc.commissionDetails.tr_transactionID = $stateParams.tran;
            tc.editMode = true;
            $scope.$on(appEvents.TransactionBasicChanged,function(){
                initializeCommission();
            });


            $scope.$watch('tc.commissionDetails', function(newVal, oldVal){

                if((newVal !== oldVal) && tc.editMode){
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

                    tc.commissionDetails.tr_netCommission = tr_netCommission * quantity;
                }

            }, true);

        }

        function initializeCommission(){
            tc.tran = $stateParams.tran;
            tc.commissionDetails = tradebook.getNewTransactionCommission();
            console.log($scope.vm);
            tc.commissionDetails.price = $scope.vm.newTransaction.tr_price;
            tc.commissionDetails.quantity = $scope.vm.newTransaction.tr_quantity;
            tradebook.getSingleTransactionCommission($stateParams.tran).then(
                function(res){
                    if(res.data.success){
                        if(res.data.commission.length !== 0){
                            tc.editMode = false;
                            tc.commissionDetails = res.data.commission[0];
                        }
                        else{
                            tc.commissionDetails.tr_transactionID = $stateParams.tran;
                        }
                    }
                }
            );
        }

        function saveCommission(){
            if($stateParams.tran !== 'new'){
                var op = (tc.commissionDetails.tr_createdBy) ? true : false;

                if(!op){
                    tradebook.transactionCommissionCrud(tc.commissionDetails,crud.CREATE).then(function(res){
                        if(res.data.success){
                            tc.editMode = false;
                            tc.commissionDetails.tr_createdBy = 'Created';
                            toastr.success('','Transaction commission added.')

                        }
                    });
                }
                else{
                    tradebook.transactionCommissionCrud(tc.commissionDetails,crud.UPDATE).then(function(res){
                        if(res.data.success){
                            tc.editMode = false;
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
            tc.editMode = true;
            tc.commTemp= angular.copy(tc.newTransaction);
        }


    }

}());
