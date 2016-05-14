/**
 * @ngdoc controller
 * @name app.tradebook.controller:TransactionStatus
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.tradebook')
        .controller('TransactionStatus', TransactionStatus);

    /* @ngInject */
    function TransactionStatus(tradebook, staticDropDown, crud, $stateParams, toastr){
        var vm = this;
        init();

        /////////////////////

        /**
         * @ngdoc method
         * @name testFunction
         * @param {number} num number is the number of the number
         * @methodOf app.tradebook.controller:TransactionStatus
         * @description
         * My Description rules
         */
        function init(){
            vm.tran = $stateParams;
            vm.saveTransactionStatus = saveTransactionStatus;
            vm.editTransactionStatus = editTransactionStatus;
            vm.transactionStatusConfig = tradebook.getTransactionStatusConfig(staticDropDown.transactionStatus);
            vm.resetWashOutValue = resetWashOutValue;
            vm.showStatus = false;
            vm.editMode = true;
            vm.cancel = cancel;
            getStateDetails();


        }

        function cancel(){
            vm.transactionStatus = vm.tempStatus;
            vm.editMode=false;
        }

        function resetWashOutValue(){
            if(vm.transactionStatus.tr_transactionStatus !== 'Washout at X'){
                vm.transactionStatus.tr_washoutValueAtPar = null;
            }
            else{
                vm.transactionStatus.tr_washoutValueAtPar = 0;
            }

        }

        function getStateDetails(){
            vm.tran = $stateParams.tran;
            if(vm.tran!=='new'){
                tradebook.getSingleTransactionStatus(vm.tran).then(function(res){
                    if(res.data.success){
                        vm.transactionStatus=res.data.status;
                        if(vm.transactionStatus.length>0){
                            vm.transactionStatus = vm.transactionStatus[0];
                            vm.editMode = false;
                            vm.newStatus = false;
                        }
                        else{
                            vm.transactionStatus = tradebook.getNewTransactionStatus(vm.tran);
                            vm.editMode = true;
                            vm.newStatus = true;
                        }
                    }
                    else{
                        toastr.error(res.data.message, 'Error');
                        vm.editMode = false;
                    }
                });
            }
        }

        function saveTransactionStatus(){
            if(vm.newStatus){
                if(vm.transactionStatus == tradebook.getNewTransactionStatus(vm.tran)){
                    toastr.error('Empty form can not be saved', "Error");
                    return;
                }
                tradebook.transactionStatusCrud(vm.transactionStatus, crud.CREATE).then(
                    function(res){
                        if(res.data.success){
                            vm.editMode = false;
                            vm.newStatus = false;
                        }
                    }
                );
            }
            else {
                tradebook.transactionStatusCrud(vm.transactionStatus, crud.UPDATE).then(
                    function (res) {
                        if (res.data.success) {
                            vm.editMode = false;
                            vm.newStatus = false;
                        }
                    }
                );
            }
        }

        function editTransactionStatus(){
            vm.editMode=true;
            vm.tempStatus = angular.copy(vm.transactionStatus);
        }
    }

}());
