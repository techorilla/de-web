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
    function Tradebook(tradebook,routing,documentExporter, appFormats, navigation, moment, $filter){
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
            routing.addRecentlyViewItems('Trade Book');
            vm.searchTransaction = '';
            vm.dateRange = navigation.initialDateRange();
            vm.appFormats = appFormats;
            vm.dateFilter = [];
            vm.selectedBuyerID = [];
            vm.selectedSellerID = [];
            vm.selectedProductID = [];
            vm.selectedCountries = [];
            vm.selectedTranStatus = [];
            vm.allTransactions = [];

            vm.onDateRangeChanged = onDateRangeChanged;
            vm.onBuyersSelectedChanged = onBuyersSelectedChanged;
            vm.onSellersSelectedChanged = onSellersSelectedChanged;
            vm.onProductsSelectedChanged = onProductsSelectedChanged;
            vm.onCountrySelectedChanged = onCountrySelectedChanged;
            vm.onTranStatusSelectedChanged = onTranStatusSelectedChanged;
            vm.filterChanged = filterChanged;
            vm.getTradeBookExcel = getTradeBookExcel;
            onDateRangeChanged(vm.dateRange);

            vm.transactionTableHeadings = ['Date', 'File No','Buyer', 'Product', 'Quantity', 'Rate', 'Seller', 'Origin', 'Shipment Start', 'Shipment End', 'Commission'];
            vm.headingAssociation = ['transactionDate','fileNo','buyer','product', 'quantity', 'rate', 'seller', 'origin', 'shipment_start', 'shipment_end', 'commission'];

            vm.headerAnchor = [
                {
                    text: 'Add new Transaction',
                    state: 'shell.tradebook.Transaction({tran:"new"})'
                }
            ];

        }

        function getTradeBookExcel(headings, dataObject){
            var filteredData = $filter('selectedRows')(vm.allTransactions,vm.tranToRemove,'tr_transactionID');
            documentExporter.getTableInExcelSheet(headings, filteredData, vm.headingAssociation, 'Tradebook');
        }

        function onDateRangeChanged(dateRange){
            if(true){
                var startDate = new Date(dateRange.startDate);
                var endDate = new Date(dateRange.endDate);
                tradebook.getTransactionListOnDateRange(startDate,endDate).then(function(res){
                    if(res.data.success){
                        vm.allTransactions = res.data.transactions;
                        filterChanged();
                    }
                });
            }
        }

        function filterChanged(){
            vm.tranToRemove = [];
            angular.forEach(vm.allTransactions,function(transaction,key){
                var removeTransaction = false;
                removeTransaction = (vm.selectedBuyerID.indexOf(transaction.tr_bpBuyerID)<=-1);
                removeTransaction = removeTransaction ||((vm.selectedSellerID.indexOf(transaction.tr_bpSellerID))<=-1);
                removeTransaction = removeTransaction || (vm.selectedProductID.indexOf(transaction.tr_productID)<=-1);
                removeTransaction = removeTransaction || (vm.selectedTranStatus.indexOf(transaction.status)<=-1);
                if(removeTransaction){
                    vm.tranToRemove.push(transaction.tr_transactionID);
                }
            });
        }

        function onBuyersSelectedChanged(selectedList){
            vm.selectedBuyerID = _.map(selectedList, 'bp_ID');
            filterChanged();
        }

        function onSellersSelectedChanged(selectedList){
            vm.selectedSellerID = _.map(selectedList, 'bp_ID');
            filterChanged();
        }

        function onProductsSelectedChanged(selectedList){
            vm.selectedProductID = _.map(selectedList, 'id');
            filterChanged();
        }

        function onCountrySelectedChanged(selectedList) {
            vm.selectedCountries = _.map(selectedList, 'origin_name');
            filterChanged();
        }

        function onTranStatusSelectedChanged(selectedList){
            vm.selectedTranStatus = _.map(selectedList, 'text');
            filterChanged();
        }

    }

}());
