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
    function Dashboard($filter,allProducts,productConfig,sellersList,buyersList, $state, navigation,appFormats, product,dashboard,bpConfig){
        var vm = this;
        init();

        function init(){
            vm.bpConfig = bpConfig;
            vm.appFormats = appFormats;
            vm.sellersList = sellersList;
            vm.buyersList = buyersList;
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
            vm.dateRangeLocal = navigation.initialDateRange();
            vm.arrivedAtPortDateRange = navigation.dashboardDateRange();
            vm.expirationDateRange = navigation.dashboardDateRange();
            vm.expectedArrivalDateRange = navigation.dashboardDateRange();
            vm.dateSelected = $filter('date')(new Date(), appFormats.Date);
            vm.productPricesForToday = [];
            vm.productPricesOnDateRange = [];
            vm.arrivedAtPortReport = [];
            vm.expectedArrivalReport = [];
            vm.expirationReport = [];
            vm.getProductsPricesByDate = getProductsPricesByDate;
            vm.getProductsPricesByDate(vm.dateSelected);
            vm.getProductPricesByDateRange = getProductPricesByDateRange;
            vm.getProductPricesByDateRange(vm.dateRange);
            vm.goToProductPrices = goToProductPrices;
            vm.getArrivedAtPortByDateRange = getArrivedAtPortByDateRange;
            vm.getExpirationByDateRange = getExpirationByDateRange;
            vm.getExpectedArrivalByDateRange = getExpectedArrivalByDateRange;
            getArrivedAtPortByDateRange(vm.arrivedAtPortDateRange);
            getExpectedArrivalByDateRange(vm.expectedArrivalDateRange);
            getExpirationByDateRange(vm.expirationDateRange);



        }

        function goToProductPrices(){
            $state.go('shell.productPrices');
        }

        function executeMethodOnDateRange(dateRange,method,successCallBack){
            var startDate = new Date(dateRange.startDate);
            var endDate = new Date(dateRange.endDate);
            method(startDate,endDate).then(function(response){
                successCallBack(response);
            });
        }

        function getArrivedAtPortByDateRange(dateRange){
            executeMethodOnDateRange(dateRange,dashboard.getArrivedAtPortReport,function(res){
                if(res.data.success){
                    vm.arrivedAtPortReport = res.data.report;
                }
            });
        }

        function getExpectedArrivalByDateRange(dateRange){
            executeMethodOnDateRange(dateRange,dashboard.getExpectedArrivalReport,function(res){
                if(res.data.success){
                    vm.expectedArrivalReport = res.data.report;
                }
            });
        }

        function getExpirationByDateRange(dateRange){
            executeMethodOnDateRange(dateRange,dashboard.getShipmentExpirationReport,function(res){
                if(res.data.success){
                    vm.expirationReport = res.data.report;
                }
            });
        }

        function getProductPricesByDateRange(dateRange){
            console.log(dateRange);
            var startDate = new Date(dateRange.startDate);
            var endDate = new Date(dateRange.endDate);
            dashboard.getProductPriceByDateRangeForDashboard(startDate,endDate).then(function(res){
                console.log(dateRange);
                if(res.data.success && (res.data.productsPrices.length>0)){
                    vm.productPricesOnDateRange = res.data.productsPrices;
                    var minDate = _.minBy(vm.productPricesOnDateRange,'priceDate').priceDate ;
                    var maxDate = _.maxBy(vm.productPricesOnDateRange,'priceDate').priceDate;
                    vm.dateRangeArray = navigation.getDateRangeArray(minDate,maxDate);
                    vm.products = _.uniq(_.map(vm.productPricesOnDateRange,'productName'));
                    vm.priceDetailsArray = [];
                    vm.localPriceDetailsArray = [];
                    angular.forEach(vm.products,function(prod,prodKey){
                        vm.priceDetailsArray.push([]);
                        vm.localPriceDetailsArray.push([]);
                        angular.forEach(vm.dateRangeArray,function(obj,key){
                            var temp = _.find(vm.productPricesOnDateRange , function(prices) {
                                var date1 = (new Date(obj).toString());
                                var date2 = (new Date(prices.priceDate).toString());
                                return (prices.productName === prod) && (date1 === date2);
                            });
                            var tempPrice = (temp) ? temp.intPrice : null;
                            var localPrice = (temp) ? temp.localPrice: null;
                            vm.priceDetailsArray[prodKey].push(tempPrice);
                            vm.localPriceDetailsArray[prodKey].push(localPrice);
                        });
                    });
                    angular.forEach(vm.dateRangeArray,function(obj,key){
                        vm.dateRangeArray[key] = $filter('date')(obj, appFormats.Date);
                    });
                }
            });
        }

        function getProductsPricesByDate(date){
            dashboard.getProductPriceForToday(date).then(function(res){
                if(res.data.success){
                    vm.productPricesForToday = res.data.productPrices;
                }
            });

        }
    }

}());
