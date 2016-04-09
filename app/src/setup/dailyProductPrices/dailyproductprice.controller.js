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
	function DailyProductPrice(allProducts, productConfig, product,crud,appFormats, $filter, $scope,toastr){
		var vm = this;
        init();

        function init(){
            vm.dateSelected = $filter('date')(new Date(), appFormats.Date);
            vm.allProducts = allProducts;
            vm.getProductsPricesByDate = getProductsPricesByDate;
            vm.productConfig = productConfig;
            //vm.getProductsPricesByDate(vm.dateSelected);
            vm.cancelEdit = cancelEdit;
            vm.editProductPrice = editProductPrice;
            vm.saveProductPrice = saveProductPrice;
            vm.currentlyEditing = [];
            $scope.$watch('vm.dateSelected',function(newVal,oldVal){
                vm.getProductsPricesByDate(vm.dateSelected);
            });

        }

        function getProductsPricesByDate(date){
            product.getProductPricesByDate(date).then(function(res){
                if(res.data.success){
                    vm.productPrices = res.data.productPrices;
                    var totalProducts = vm.productPrices.length;
                    while(totalProducts>0){
                        vm.currentlyEditing.push({});
                        totalProducts--;
                    }                }
            });
        }

        function cancelEdit(index){
            vm.productPrices[index] = vm.currentlyEditing[index];
            vm.productPrices[index].editMode = false;
        }

        function editProductPrice(index, productPrice){
            vm.currentlyEditing[index] = angular.copy(productPrice);
            productPrice.editMode = true;
        }

        function saveProductPrice(index,productPrice){
            if((productPrice.localPrice === 0)&&(productPrice.price === 0)){
                toastr.error('Please enter local or international price.', 'Error');
                return;
            }
            var operation = (vm.currentlyEditing[index].price === null && vm.currentlyEditing[index].localPrice === null) ? crud.CREATE : crud.UPDATE;
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
