/**
 * @ngdoc controller
 * @name app.tradebook.controller:Tradebook
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.tradebook')
		.controller('Tradebook', Tradebook);

  /* @ngInject */
	function Tradebook(tradebook,toastr, documentExporter){
		var vm = this;
        init();
    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.tradebook.controller:Tradebook
     * @description
     * My Description rules
     */
     function init(){
            vm.searchTransaction = '';
            vm.headerAnchor = [
                {
                    text: 'Add new Transaction',
                    state: 'shell.tradebook.Transaction({tran:"new"})'
                }
            ];
            vm.allTransactions = [];
            tradebook.getTransactionList().then(function(res){
                if(!res.data.success){
                    toastr.error(res.data.message, 'Can Not Get Transaction From Server');
                }
                else{
                    vm.allTransactions = res.data.transactions;
                }
            });
            vm.transactionTableHeadings = ['Date', 'File No','Buyer', 'Product', 'Quantity', 'Rate', 'Seller', 'Origin', 'Port', 'Shipment', 'Commission'];
            vm.headingAssociation = ['transactionDate','fileNo','buyer','product', 'quantity', 'rate', 'seller', 'origin', 'port', 'shipment', 'commission'];
            vm.getTradeBookExcel = getTradeBookExcel;
     }

     function getTradeBookExcel(headings, dataObject){
         documentExporter.getTableInExcelSheet(headings, dataObject, vm.headingAssociation, 'Tradebook');
     }

  }

}());
