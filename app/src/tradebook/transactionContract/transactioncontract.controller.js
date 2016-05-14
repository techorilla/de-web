/**
 * @ngdoc controller
 * @name app.tradebook.controller:TransactionContract
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.tradebook')
        .controller('TransactionContract', TransactionContract);

    /* @ngInject */
    function TransactionContract(tradebook, bpConfig, buyersList, $stateParams,crud,toastr){
        var vm = this;
        init();

        /////////////////////

        /**
         * @ngdoc method
         * @name testFunction
         * @param {number} num number is the number of the number
         * @methodOf app.tradebook.controller:TransactionContract
         * @description
         * My Description rules
         */
        function init(){
            vm.saveTransactionContract = saveTransactionContract;
            vm.editTransactionContract = editTransactionContract;
            vm.transactionContract = {};
            vm.cancelTransactionContract = cancelTransactionContract;
            vm.editMode=true;
            vm.bpConfig = bpConfig ;
            vm.buyersList = buyersList;
            vm.contractChanged  = contractChanged;
            getContractDetails();


        }

        function getContractDetails(){
            vm.tran = $stateParams.tran;
            if(vm.tran!=='new'){
                tradebook.getSingleTransactionContract(vm.tran).then(function(res){
                    if(res.data.success){
                        vm.transactionContract=res.data.contract;
                        if(vm.transactionContract.length>0){
                            vm.transactionContract = vm.transactionContract[0];
                            vm.editMode = false;
                            vm.newContract = false;
                        }
                        else{
                            vm.transactionContract = tradebook.getNewTransactionContract(vm.tran);
                            vm.editMode = true;
                            vm.newContract = true;
                        }
                    }
                    else{
                        vm.editMode = false;
                    }
                });
            }
        }

        function contractChanged(value,contract){
            if(value){
                vm.transactionContract[contract] = false;
            }
            vm.transactionContract.tr_contractualBuyer = null;
        }

        function saveTransactionContract(){
            if(vm.newContract){
                if(vm.transactionContract == tradebook.getNewTransactionContract(vm.tran)){
                    toastr.error('Empty form can not be saved', "Error");
                    return;
                }
                tradebook.transactionContractCrud(vm.transactionContract, crud.CREATE).then(
                    function(res){
                        if(res.data.success){
                            vm.editMode = false;
                            vm.newContract = false;
                            toastr.success(res.data.message,'Success');
                        }
                    }
                );
            }
            else {
                tradebook.transactionContractCrud(vm.transactionContract, crud.UPDATE).then(
                    function (res) {
                        if (res.data.success) {
                            vm.editMode = false;
                            vm.newContract = false;
                            toastr.success(res.data.message, 'Success');
                        }
                    }
                );
            }
        }



        function editTransactionContract(){
            vm.editMode=true;
            vm.tempContract = angular.copy(vm.transactionContract);
        }

        function cancelTransactionContract(){
            vm.editMode=false;
            vm.transactionContract = vm.tempContract;
        }
    }

}());
