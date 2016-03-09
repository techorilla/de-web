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
	function DailyProductPrice(allProducts, productConfig, product,crud){
		var vm = this;
        init();

        function init(){
            vm.dateSelected = new Date();
            vm.allProducts = allProducts;
            vm.getProductsPricesByDate = getProductsPricesByDate;
            vm.productConfig = productConfig;
            vm.getProductsPricesByDate(vm.dateSelected);
            vm.cancelEdit = cancelEdit;
            vm.editProductPrice = editProductPrice;
            vm.saveProductPrice = saveProductPrice;
            vm.currentlyEditing = {};
        }

        function getProductsPricesByDate(date){
            product.getProductPricesByDate(date.toISOString()).then(function(res){
                if(res.data.success){
                    vm.productPrices = res.data.productPrices;
                }
            });
        }

        function cancelEdit(index){
            vm.productPrices[index] = vm.currentlyEditing;
            vm.productPrices[index].editMode = false;

        }

        function editProductPrice(productPrice){
            vm.currentlyEditing = angular.copy(productPrice);
            productPrice.editMode = true;
        }

        function saveProductPrice(index,productPrice){
            var operation = (vm.currentlyEditing.price === null) ? crud.CREATE : crud.UPDATE;
            productPrice.date = vm.dateSelected;
            product.dailyProductsPricesCrud(productPrice,operation).then(function(res){
                productPrice.editMode = false;
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
