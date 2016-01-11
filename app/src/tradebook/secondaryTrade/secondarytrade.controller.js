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
                    }
                    else{
                        toastr.error(res.data.message, 'Error');
                    }
                }, function(){
                    toastr.error('Can not get secondary transactions','Error');
                });
            };
            console.log(vm.secondaryTransactions);
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
        }

        function cancel(){
            vm.newSecondaryTransaction = tradebook.getNewSecondaryTransaction();
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
            vm.newSecondaryTransaction.tr_transactionID = $stateParams.tran;
            tradebook.transactionSecondaryCrud(vm.newSecondaryTransaction,crud.CREATE).then(function (res){
                if(res.data.success){
                    vm.currentlyAdding = false;
                    vm.newSecondaryTransaction.tr_sec_tranID = res.data.sec_id;
                    vm.secondaryTransactions.push(vm.newSecondaryTransaction);
                    toastr.success('','Secondary Transaction Added.')

                }
                else{
                    toastr.error(res.data.message, 'Error');
                }
            },function(){
                toastr.error('Secondary Transaction was not added due to some problem', 'Error');
            });

        }
        function deleteSecondaryTransaction(tr_sec_tranID,index){
            vm.secondaryTransactions.splice(index, 1);
        }
	}

}());
