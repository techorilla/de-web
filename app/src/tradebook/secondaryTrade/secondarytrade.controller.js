/**
 * @ngdoc controller
 * @name app.tradebook.controller:SecondaryTrade
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.tradebook')
		.controller('SecondaryTrade', SecondaryTrade);

  /* @ngInject */
	function SecondaryTrade(toastr, sellersList,buyersList, bpConfig, tradebook, $stateParams, crud){
		var vm = this;
        init();



    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.tradebook.controller:secondaryTrade
     * @description
     * My Description rules
     */
        function init(){
            vm.secondaryTransactions = [];
            if($stateParams.tran !== 'new'){
                tradebook.getSingleTransactionSec($stateParams.tran).then(function(res){
                    if(res.data.success){
                        vm.secondaryTransactions = res.data.sec;
                        if(vm.secondaryTransactions.length === 0){
                            vm.currentlyAdding = true;
                        }
                    }
                });
            }

            vm.bpConfig = bpConfig;
            vm.sellersList = sellersList;
            vm.buyersList = buyersList;
            vm.showSecondaryTrade = false;
            vm.secondaryTradeCount = vm.secondaryTransactions.length;
            vm.currentlyAdding = false;
            vm.newSecondaryTransaction = tradebook.getNewSecondaryTransaction();
            vm.cancel = cancel;
            vm.addSecondary = addSecondary;
            vm.deleteSecondaryTransaction = deleteSecondaryTransaction;
            vm.editSecondaryTransaction = editSecondaryTransaction;
            vm.editMode = false;
        }

        function cancel(){
            if(vm.newSecondaryTransaction.tr_sec_tranID === null){
                vm.newSecondaryTransaction = tradebook.getNewSecondaryTransaction();
            }
            else{
                vm.secondaryTransactions.push(vm.newSecondaryTransaction);
            }
            vm.currentlyAdding = false;
        }

        function addSecondary(){
            if($stateParams.tran === 'new'){
                toast.error('Add/Save Basic Transaction Info First','Error');
                return;
            }
            if(     vm.newSecondaryTransaction.tr_sec_bpBuyerID===''
                ||  vm.newSecondaryTransaction.tr_sec_bpSellerID===''
                ||  vm.newSecondaryTransaction.tr_sec_buyerPrice===''
                ||  vm.newSecondaryTransaction.tr_sec_sellerPrice===''
                ||  vm.newSecondaryTransaction.tr_sec_date===''){

                toastr.error("Some required fields are missing for secondary transaction", "Error")
                return;
            }
            if(!vm.editMode){
                vm.newSecondaryTransaction.tr_transactionID = $stateParams.tran;
                tradebook.transactionSecondaryCrud(vm.newSecondaryTransaction,crud.CREATE).then(function (res){
                    if(res.data.success){
                        vm.currentlyAdding = false;
                        vm.newSecondaryTransaction.tr_sec_tranID = res.data.sec_id;
                        vm.secondaryTransactions.push(vm.newSecondaryTransaction);
                        toastr.success('','Secondary Transaction Added.');
                        vm.newSecondaryTransaction = tradebook.getNewSecondaryTransaction();

                    }
                });
            }
            else{
                tradebook.transactionSecondaryCrud(vm.newSecondaryTransaction,crud.UPDATE).then(function (res){
                    if(res.data.success){
                        vm.currentlyAdding = false;
                        vm.editMode = false
                        vm.newSecondaryTransaction.tr_sec_tranID = res.data.sec_id;
                        vm.secondaryTransactions.push(vm.newSecondaryTransaction);
                        toastr.success('','Secondary Transaction Updated.');
                        vm.newSecondaryTransaction = tradebook.getNewSecondaryTransaction();

                    }
                });
            }

        }

        function deleteSecondaryTransaction(index){
            tradebook.transactionSecondaryCrud(vm.secondaryTransactions[index], crud.DELETE).then(function(res){
                if(res.data.success){
                    toastr.success(res.data.message,'Deleted');
                    vm.secondaryTransactions.splice(index, 1);
                    if(vm.secondaryTransactions.length === 0){
                        vm.currentlyAdding = true;
                    }
                }
            });
        }

        function editSecondaryTransaction(index){

            vm.newSecondaryTransaction = vm.secondaryTransactions[index];
            vm.secondaryTransactions.splice(index, 1);
            vm.currentlyAdding = true;
            vm.editMode = true;

        }


	}

}());
