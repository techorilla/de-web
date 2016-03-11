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
    function Dashboard($filter,allProducts,productConfig, $scope, navigation,appFormats, product){
        var vm = this;
        init();

        function init(){
            vm.chartColors = navigation.chartColors();
            vm.allProducts = allProducts;
            vm.productConfig = productConfig;
            vm.dateRange = navigation.initialDateRange();
            vm.dateSelected = $filter('date')(new Date(), appFormats.Date);
            vm.productPricesForToday = [];
            vm.productPricesOnDateRange = [];
            vm.getProductsPricesByDate = getProductsPricesByDate;
            vm.getProductsPricesByDate(vm.dateSelected);
            vm.getProductPricesByDateRange = getProductPricesByDateRange;
            vm.getProductPricesByDateRange(vm.dateRange);


        }

        function getProductPricesByDateRange(dateRange){
            var startDate = new Date(dateRange.startDate);
            var endDate = new Date(dateRange.endDate);
            product.getProductPricesByDateRange(startDate,endDate).then(function(res){
                if(res.data.success){
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
