/**
 * @ngdoc controller
 * @name app.setup.controller:DashboardProducts
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.setup')
        .controller('DashboardProducts', DashboardProducts);

    /* @ngInject */
    function DashboardProducts(setup,allProducts,productConfig, toastr,crud){
        var vm = this;
        init();

        function init(){
            vm.dashboardProducts = [];
            vm.allProducts = allProducts;
            vm.productConfig = productConfig;
            vm.productId = '';
            vm.addDashboardProduct = addDashboardProduct;
            vm.deleteDashboardProduct = deleteDashboardProduct;
            setup.getDashboardProducts().then(function(res){
                if(res.data.success){
                    vm.dashboardProducts = res.data.dashboardProducts;
                }
            });
        }

        function deleteDashboardProduct(productId,index){
            setup.dashboardProductCRUD(productId,crud.DELETE).then(function(res){
                if(res.data.success) {
                    vm.dashboardProducts.splice(index,1);
                }
            });
        }

        function addDashboardProduct(productId){
            vm.isAlreadyPresent = false;
            if(vm.dashboardProducts.length >= 7){
                toastr.error('You can only have 7 products on dashboard', 'Error');
                vm.productId = '';
                return;
            }
            else{
                angular.forEach(vm.dashboardProducts,function(val){
                    if(parseInt(val.productId) === parseInt(productId)){
                        toastr.error('You already have this product on the list', 'Error');

                        vm.isAlreadyPresent = true;

                    }
                });
                if(!vm.isAlreadyPresent){
                    setup.dashboardProductCRUD(productId,crud.CREATE).then(function(res){
                        if(res.data.success){
                            vm.dashboardProducts.push({productId: productId});
                        }
                    });
                }
                vm.productId = '';
            }
        }
    }

}());
