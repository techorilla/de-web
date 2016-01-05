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
	function SecondaryTrade(toastr, sellersList,buyersList, bpConfig, tradebook, $stateParams){
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
                toast.error('Add Basic Transaction Info First','Error');
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
            vm.currentlyAdding = false;
            vm.secondaryTransactions.push(vm.newSecondaryTransaction);
            vm.newSecondaryTransaction = tradebook.getNewSecondaryTransaction();
        }
        function deleteSecondaryTransaction(tr_sec_tranID,index){
            vm.secondaryTransactions.splice(index, 1);
        }
	}

}());
