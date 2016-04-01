/**
 * @ngdoc controller
 * @name app.dashboard.controller:Dashboard
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    /* @ngInject */
    function Dashboard($filter,allProducts,productConfig, $state, navigation,appFormats, product){
        var vm = this;
        init();

        function init(){
            vm.showProductsPrices = true;
            vm.showArrivedAtPort = true;
            vm.showExpected = true;
            vm.showExpiration = true;
            vm.priceAnalysis = true;
            vm.localPriceAnalysis = true;
            vm.chartColors = navigation.chartColors();
            vm.allProducts = allProducts;
            vm.productConfig = productConfig;
            vm.dateRange = navigation.initialDateRange();
            vm.arrivedAtPortDateRange = navigation.initialDateRange();
            vm.expirationDateRange = navigation.initialDateRange();
            vm.expectedArrivalDateRange = navigation.initialDateRange();
            vm.dateSelected = $filter('date')(new Date(), appFormats.Date);
            vm.productPricesForToday = [];
            vm.productPricesOnDateRange = [];
            vm.getProductsPricesByDate = getProductsPricesByDate;
            vm.getProductsPricesByDate(vm.dateSelected);
            vm.getProductPricesByDateRange = getProductPricesByDateRange;
            vm.getProductPricesByDateRange(vm.dateRange);
            vm.goToProductPrices = goToProductPrices;
            vm.getArrivedAtPortByDateRange = getArrivedAtPortByDateRange;
            vm.getExpirationByDateRange = getExpirationByDateRange;
            vm.getExpectedArrivalByDateRange = getExpectedArrivalByDateRange;


        }

        function goToProductPrices(){
            $state.go('shell.productPrices');
        }

        function getArrivedAtPortByDateRange(dateRange){
            var startDate = new Date(dateRange.startDate);
            var endDate = new Date(dateRange.endDate);
        }

        function getExpectedArrivalByDateRange(dateRange){
            var startDate = new Date(dateRange.startDate);
            var endDate = new Date(dateRange.endDate);
        }

        function getExpirationByDateRange(dateRange){
            var startDate = new Date(dateRange.startDate);
            var endDate = new Date(dateRange.endDate);
        }

        function getProductPricesByDateRange(dateRange){
            var startDate = new Date(dateRange.startDate);
            var endDate = new Date(dateRange.endDate);
            product.getProductPricesByDateRange(startDate,endDate).then(function(res){
                if(res.data.success && (res.data.productsPrices.length>0)){
                    vm.productPricesOnDateRange = res.data.productsPrices;
                    var minDate = _.minBy(vm.productPricesOnDateRange,'priceDate').priceDate ;
                    var maxDate = _.maxBy(vm.productPricesOnDateRange,'priceDate').priceDate;

                    vm.dateRangeArray = navigation.getDateRangeArray(minDate,maxDate);
                    vm.products = _.uniq(_.map(vm.productPricesOnDateRange,'productName'));
                    vm.priceDetailsArray = [];

                    angular.forEach(vm.products,function(prod,prodKey){
                        vm.priceDetailsArray.push([]);
                        angular.forEach(vm.dateRangeArray,function(obj,key){
                            var temp = _.find(vm.productPricesOnDateRange , function(prices) {
                                var date1 = (new Date(obj).toString());
                                var date2 = (new Date(prices.priceDate).toString());
                                return (prices.productName === prod) && (date1 === date2);
                            });
                            var tempPrice = (temp) ? temp.price : null;
                            vm.priceDetailsArray[prodKey].push(tempPrice);
                        });
                    });

                    angular.forEach(vm.dateRangeArray,function(obj,key){
                        vm.dateRangeArray[key] = $filter('date')(obj, appFormats.Date);
                    });
                }
            });
        }

        function getProductsPricesByDate(date){
            product.getProductPricesByDate(date).then(function(res){
                if(res.data.success){
                    vm.productPricesForToday = res.data.productPrices;
                }
            });
        }
    }

}());
