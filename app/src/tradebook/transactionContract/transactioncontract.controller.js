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
    function TransactionContract(tradebook){
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
        }
    }

}());
