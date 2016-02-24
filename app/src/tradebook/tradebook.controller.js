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
	function Tradebook(tradebook,documentExporter, appFormats, $scope){
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
            vm.appFormats = appFormats;
            vm.buyerFilter = [];
            vm.sellerFilter = [];
            vm.productFilter = [];
            vm.tranStatusFilter = [];
            vm.dateFilter = [];

            vm.headerAnchor = [
                {
                    text: 'Add new Transaction',
                    state: 'shell.tradebook.Transaction({tran:"new"})'
                }
            ];
            vm.allTransactions = [];
            tradebook.getTransactionList().then(function(res){
                if(res.data.success){
                    vm.allTransactions = res.data.transactions;
                }
            });
            vm.transactionTableHeadings = ['Date', 'File No','Buyer', 'Product', 'Quantity', 'Rate', 'Seller', 'Origin', 'Shipment Start', 'Shipment End', 'Commission'];
            vm.headingAssociation = ['transactionDate','fileNo','buyer','product', 'quantity', 'rate', 'seller', 'origin', 'shipment_start', 'shipment_end', 'commission'];
            vm.getTradeBookExcel = getTradeBookExcel;
            vm.dateRange = {
                date:{
                    startDate:  (moment().startOf('month')),
                    endDate: (moment().endOf('month'))
                }
            };


//            $scope.$watch('vm.dateRange',function(newVal, oldVal){
//                console.log(newVal);
//            },true);
     }

     function getTradeBookExcel(headings, dataObject){
         documentExporter.getTableInExcelSheet(headings, dataObject, vm.headingAssociation, 'Tradebook');
     }

  }

}());
