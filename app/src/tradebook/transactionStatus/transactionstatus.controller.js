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
    function TransactionStatus(tradebook, staticDropDown, $stateParams){
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

            vm.transactionStatus = tradebook.getNewTransactionStatus();
            vm.saveTransactionStatus = saveTransactionStatus;
            vm.editTransactionStatus = editTransactionStatus;
            vm.transactionStatusConfig = {
                options: staticDropDown.transactionStatus,
                create: true,
                sortField: 'value',
                valueField: 'text',
                labelField: 'text',
                maxItems:1
            };

            vm.showStatus = false;
            vm.editMode = true;
            vm.cancel = cancel;

        }

        function cancel(){

        }

        function saveTransactionStatus(){
            console.log(vm.transactionStatus);
        }

        function editTransactionStatus(){

        }
    }

}());
