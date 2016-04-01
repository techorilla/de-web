/**
 * @ngdoc controller
 * @name app.setup.controller:DailyProductPrice
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.setup')
		.controller('DailyProductPrice', DailyProductPrice);

  /* @ngInject */
	function DailyProductPrice(allProducts, productConfig, product,crud,appFormats, $filter, $scope){
		var vm = this;
        init();

        function init(){
            vm.dateSelected = $filter('date')(new Date(), appFormats.Date);
            vm.allProducts = allProducts;
            vm.getProductsPricesByDate = getProductsPricesByDate;
            vm.productConfig = productConfig;
            //vm.getProductsPricesByDate(vm.dateSelected);
            vm.cancelEdit = cancelEdit;
            vm.cancelEditLocal = cancelEditLocal;
            vm.editProductPrice = editProductPrice;
            vm.editProductPriceLocal = editProductPriceLocal;
            vm.saveProductPrice = saveProductPrice;
            vm.saveProductPriceLocal = saveProductPriceLocal;
            vm.currentlyEditing = {};
            vm.currentlyEditingLocal={};
            $scope.$watch('vm.dateSelected',function(newVal,oldVal){
                vm.getProductsPricesByDate(vm.dateSelected);
            });

        }

        function getProductsPricesByDate(date){
            product.getProductPricesByDate(date).then(function(res){
                if(res.data.success){
                    vm.productPrices = res.data.productPrices;
                }
            });
            product.getLocalProductPricesByDate(date).then(function(res){
                if(res.data.success){
                    vm.productLocalPrices = res.data.productPrices;

                }
            });
        }

        function cancelEdit(index){
            vm.productPrices[index] = vm.currentlyEditing;
            vm.productPrices[index].editMode = false;
        }

        function cancelEditLocal(index){
            vm.productLocalPrices[index] = vm.currentlyEditingLocal;
            vm.productLocalPrices[index].editLocalMode = false;
        }

        function editProductPrice(productPrice){
            vm.currentlyEditing = angular.copy(productPrice);
            productPrice.editMode = true;
        }

        function editProductPriceLocal(productPrice){
            vm.currentlyEditingLocal = angular.copy(productPrice);
            productPrice.editLocalMode = true;
        }

        function saveProductPrice(index,productPrice){
            var operation = (vm.currentlyEditing.price === null) ? crud.CREATE : crud.UPDATE;
            productPrice.date = vm.dateSelected;
            product.dailyProductsPricesCrud(productPrice,operation).then(function(res){
                productPrice.editLocalMode = false;
            },function(err){
                vm.cancel(index);
            });
        }

        function saveProductPriceLocal(index,productPrice){
            var operation = (vm.currentlyEditingLocal.price === null) ? crud.CREATE : crud.UPDATE;
            productPrice.date = vm.dateSelected;
            product.dailyProductsLocalPricesCrud(productPrice,operation).then(function(res){
                productPrice.editLocalMode = false;
            },function(err){
                vm.cancel(index);
            });
        }

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.setup.controller:DailyProductPrice
     * @description
     * My Description rules
     */
	}

}());
