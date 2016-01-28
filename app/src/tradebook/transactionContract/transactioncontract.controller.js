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
    function TransactionContract(tradebook, bpConfig, buyersList, $stateParams){
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
            vm.getStateParams = getStateParams;
            vm.transactionContract = {};
            vm.cancelTransactionContract = cancelTransactionContract;
            vm.editMode=true;
            vm.transactionContract = tradebook.getNewTransactionContract();
            vm.bpConfig = bpConfig ;
            vm.buyersList = buyersList;

        }

        function getStateParams(){
            vm.tran = $stateParams.tran;
            if(vm.tran==='new'){

            }

        }

        function saveTransactionContract(){

        }

        function editTransactionContract(){

        }

        function cancelTransactionContract(){

        }
    }

}());
