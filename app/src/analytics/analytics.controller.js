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
	function Analytics($scope,navigation,product){
        var vm = this;

        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
        $scope.data = [300, 500, 100, 40, 120];
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
            vm.productSalesAnalytics = [];
            vm.getproductSalesAnalytics = getproductSalesAnalytics;
            vm.getproductSalesAnalytics(vm.dateRange);


        }

        function getproductSalesAnalytics(dateRange){
            var startDate = new Date(dateRange.startDate);
            var endDate = new Date(dateRange.endDate);
            product.productSalesAnalytics(startDate,endDate).then(function(res){
                vm.productSalesAnalytics = res.data.productSalesAnalytics;
                vm.productsVolume = _.map(vm.productSalesAnalytics,'volume');
                vm.productsQuantity = _.map(vm.productSalesAnalytics,'quantity');
                vm.productsNetCommission = _.map(vm.productSalesAnalytics,'netCommission');
                vm.products = _.map(vm.productSalesAnalytics,'productName');
                console.log(vm.productsNetCommission);
            });
        }
	}

}());
