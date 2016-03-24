/**
 * @ngdoc controller
 * @name app.product.controller:Product
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.product')
		.controller('Product', Product);

  /* @ngInject */
	function Product(allProducts,product, toastr,appFormats,routing,$state ){
		var vm = this;
        init();

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.product.controller:Product
     * @description
     * My Description rules
     */
    function init(){
            routing.addRecentlyViewItems('All Products' , $state.current.name, $state.params);
            vm.orderByReverse = false;
            vm.searchProduct = '';
            vm.allProducts = {};
            vm.appFormats = appFormats;
            vm.allProducts.products = allProducts;
            vm.allProducts.tableHeadings =  [
                                                {
                                                  name:'Name',
                                                  filter: true
                                                },
                                                {
                                                  name:'Quality',
                                                  filter:true
                                                },
                                                {
                                                  name:'Origin',
                                                  filter:true
                                                },
                                                {
                                                  name:'Last Traded',
                                                  filter:true
                                                }
                                            ];
            vm.headerAnchor = [
                {
                    text: 'Add new Product',
                    state: 'shell.products.addProduct'
                },
                {
                    text: 'All Products Complete Report',
                    state: 'shell.products.all.report'
                }
            ];
        vm.deleteProduct = function(name, id, index){
                product.deleteProduct(name, id,function(response){
                    if (response.success) {
                        toastr.success(response.message, 'Success');
                        vm.allProducts.products.splice(index, 1);
                    }
                });
            }
        }

	}

}());
