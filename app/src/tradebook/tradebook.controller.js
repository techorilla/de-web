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
    function Tradebook(tradebook,documentExporter, appFormats, navigation, moment){
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
            vm.dateRange = navigation.initialDateRange();
            vm.onDateRangeChanged = onDateRangeChanged;
            vm.appFormats = appFormats;
            vm.buyerFilter = [];
            vm.sellerFilter = [];
            vm.productFilter = [];
            vm.tranStatusFilter = [];
            vm.dateFilter = [];
            vm.onBuyersSelectedChanged = onBuyersSelectedChanged;
            vm.onSellersSelectedChanged = onSellersSelectedChanged;
            vm.onProductsSelectedChanged = onProductsSelectedChanged;
            vm.onCountrySelectedChanged = onCountrySelectedChanged;
            vm.onTranStatusSelectedChanged = onTranStatusSelectedChanged;
            vm.tranCached = [];

            vm.headerAnchor = [
                {
                    text: 'Add new Transaction',
                    state: 'shell.tradebook.Transaction({tran:"new"})'
                }
            ];
            vm.allTransactions = [];
//            tradebook.getTransactionList().then(function(res){
//                if(res.data.success){
//                    vm.allTransactions = res.data.transactions;
//                }
//            });
            vm.transactionTableHeadings = ['Date', 'File No','Buyer', 'Product', 'Quantity', 'Rate', 'Seller', 'Origin', 'Shipment Start', 'Shipment End', 'Commission'];
            vm.headingAssociation = ['transactionDate','fileNo','buyer','product', 'quantity', 'rate', 'seller', 'origin', 'shipment_start', 'shipment_end', 'commission'];
            vm.getTradeBookExcel = getTradeBookExcel;
            vm.onDateRangeChanged = onDateRangeChanged;




//            $scope.$watch('vm.dateRange',function(newVal, oldVal){
//                console.log(newVal);
//            },true);
        }

        function getTradeBookExcel(headings, dataObject){
            documentExporter.getTableInExcelSheet(headings, dataObject, vm.headingAssociation, 'Tradebook');
        }

        function onDateRangeChanged(dateRange){
            if(typeof dateRange === 'string'){
                var dates = dateRange.split(' to ');
                var startDate = new Date(dates[0]);
                var endDate = new Date(dates[1]);
                tradebook.getTransactionListOnDateRange(startDate,endDate).then(function(res){
                    if(res.data.success){
                        vm.allTransactions = res.data.transactions;
                        vm.tranCached = angular.copy(vm.allTransactions);
                    }
                });
            }
        }

        function onBpSelectedChanged(selectedList){
            vm.allTransactions = angular.copy(vm.tranCached);
            var selectedBuyerID = _.map(selectedList, 'bp_ID');
            angular.forEach(vm.allTransactions,function(val,key){
                if(selectedBuyerID.indexOf(val.tr_bpBuyerID) <= -1  ){
                    vm.allTransactions.splice(key,1);
                }
            });
        }
        function onBuyersSelectedChanged(selectedList){
            onBpSelectedChanged(selectedList);
        }

        function onSellersSelectedChanged(selectedList){
            onBpSelectedChanged(selectedList);
        }

        function onProductsSelectedChanged(selectedList){
            var selectedProductID = _.map(selectedList, 'id');
        }

        function onCountrySelectedChanged(selectedList){
            var selectedCountries = _.map(selectedList, 'origin_name');
        }


        function onTranStatusSelectedChanged(selectedList){
            var selectedTranStatus = _.map(selectedList, 'text');
        }

    }

}());
