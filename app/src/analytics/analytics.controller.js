/**
 * @ngdoc controller
 * @name app.analytics.controller:Analytics
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.analytics')
        .controller('Analytics', Analytics);

    /* @ngInject */
    function Analytics($scope,navigation,product,tradebook,$filter,appFormats){
        var vm = this;
        init();

        /////////////////////

        /**
         * @ngdoc method
         * @name testFunction
         * @param {number} num number is the number of the number
         * @methodOf app.dashboard.controller:Dashboard
         * @description
         * My Description rules
         */
        function init(){
            vm.dateRange = navigation.initialDateRange();
            vm.chartColors = navigation.chartColors();
            vm.timeDrillBy = 'day';
            vm.productSalesAnalytics = [];
            vm.allTransactions = [];
            vm.totalVolume = 0;
            vm.totalQuantity = 0;
            vm.totalNetCommission = 0;
            vm.selectedBuyerID = [];
            vm.selectedSellerID = [];
            vm.selectedProductID = [];
            vm.selectedCountries = [];
            vm.selectedTranStatus = [];
            vm.dateLabels = [];
            vm.getProductSalesAnalytics = getProductSalesAnalytics;
            vm.getTransactionAnalytics = getTransactionAnalytics;
            vm.onDateRangeChanged = onDateRangeChanged;
            vm.optionSelectedChanged = optionSelectedChanged;
            vm.netCommissionSelected = true;
            vm.quantitySelected = true;
            vm.volumeSelected = true;


            vm.onDateRangeChanged = onDateRangeChanged;
            vm.onBuyersSelectedChanged = onBuyersSelectedChanged;
            vm.onSellersSelectedChanged = onSellersSelectedChanged;
            vm.onProductsSelectedChanged = onProductsSelectedChanged;
            vm.onCountrySelectedChanged = onCountrySelectedChanged;
            vm.onTranStatusSelectedChanged = onTranStatusSelectedChanged;
            vm.timeDrillOptions = [
                {text:'By Day', value: 'day'},
                {text:'By Week', value:'week'},
                {text:'By Month', value:'month'},
                {text:'By Year', value:'year'}
            ];
            vm.timeDrillConfig = tradebook.getTimeDrillConfig(vm.timeDrillOptions);
            vm.seriesBarCharts = ['Quantity','Volume','Net Commission'];
            vm.dataBarChars = [[],[],[]];
            vm.timeDrillChanged = timeDrillChanged;


            $scope.series = ['Series A', 'Series B'];

            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90],
                [28, 48, 40, 19, 86, 27, 90]
            ];
            vm.onDateRangeChanged(vm.dateRange);
        }

        function onDateRangeChanged(dateRange){
            vm.getProductSalesAnalytics(dateRange);
            vm.getTransactionAnalytics(dateRange);
        }

        function getProductSalesAnalytics(dateRange){
            var startDate = new Date(dateRange.startDate);
            var endDate = new Date(dateRange.endDate);
            product.productSalesAnalytics(startDate,endDate).then(function(res){
                vm.productSalesAnalytics = res.data.productSalesAnalytics;
                vm.productsVolume = _.map(vm.productSalesAnalytics,'volume');
                vm.productsQuantity = _.map(vm.productSalesAnalytics,'quantity');
                vm.productsNetCommission = _.map(vm.productSalesAnalytics,'netCommission');
                vm.products = _.map(vm.productSalesAnalytics,'productName');
            });
        }

        function optionSelectedChanged(option,value){

        }

        function getTransactionAnalytics(dateRange){
            var startDate = new Date(dateRange.startDate);
            var endDate = new Date(dateRange.endDate);
            tradebook.getTransactionListOnDateRange(startDate,endDate).then(function(res){
                vm.allTransactions = res.data.transactions;
                filterChanged();
                timeDrillChanged(vm.timeDrillBy);
            });

        }



        function timeDrillChanged(timeDrill){
            var minDate = _.minBy(vm.allTransactions,'transactionDate').transactionDate ;
            var maxDate = _.maxBy(vm.allTransactions,'transactionDate').transactionDate;
            if(timeDrill === 'day'){
                vm.dateLabels = navigation.getDateRangeArray(minDate,maxDate);
                vm.dataBarChars = [[],[],[]];
                angular.forEach(vm.dateLabels,function(date,key){
                    vm.dateLabels[key] = $filter('date')(date, appFormats.Date);
                    var tranInDate = _.filter(vm.allTransactions,function(tran){
                         return vm.dateLabels[key] === $filter('date')(tran.transactionDate, appFormats.Date);
                    });
                    vm.dataBarChars[0].push(
                        _.sumBy(tranInDate,function(tran){
                        return tran.quantity;
                        })
                    );
                    vm.dataBarChars[1].push(_.sumBy(tranInDate,function(tran){
                        return (tran.quantity*tran.rate);
                    }));
                    vm.dataBarChars[2].push(_.sumBy(tranInDate,function(tran){
                        if(tran.commission === 'Not Entered'){
                            return 0;
                        }
                        else{
                            tran.commission = tran.commission.replace('$','');
                            return (parseInt(tran.commission));
                        }
                    }));



                });
                console.log(vm.dataBarChars);
            }
            if(timeDrill === 'year'){
                vm.dateLabels = navigation.getYearsInDateRange(minDate,maxDate);
            }
        }

        function filterChanged(){
            vm.tranToRemove = [];
            angular.forEach(vm.allTransactions,function(transaction,key){
                var removeTransaction = false;
                removeTransaction = (vm.selectedBuyerID.indexOf(transaction.tr_bpBuyerID)<=-1);
                removeTransaction = removeTransaction ||((vm.selectedSellerID.indexOf(transaction.tr_bpSellerID))<=-1);
                removeTransaction = removeTransaction || (vm.selectedProductID.indexOf(transaction.tr_productID)<=-1);
                removeTransaction = removeTransaction || (vm.selectedCountries.indexOf(transaction.origin)<=-1);
                if(removeTransaction){
                    vm.tranToRemove.push(transaction.tr_transactionID);
                }
            });

            calculateAnalytics();

        }

        function calculateAnalytics(){
            var filteredData = $filter('selectedRows')(vm.allTransactions,vm.tranToRemove,'tr_transactionID');
            vm.totalVolume = _.sumBy(filteredData, function(tran) {
                return (tran.quantity * tran.rate);
            });
            vm.totalQuantity = _.sumBy(filteredData, function(tran) {
                return (tran.quantity);
            });
            vm.totalNetCommission = _.sumBy(filteredData, function(tran) {
                if(tran.commission === 'Not Entered'){
                    return 0;
                }
                else{
                    tran.commission = tran.commission.replace('$','');
                    return (parseInt(tran.commission));
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
