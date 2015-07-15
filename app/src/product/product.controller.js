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
	function Product(allProducts){
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
            vm.orderByReverse = false;
            vm.searchProduct = '';
            vm.allProducts = allProducts;
            vm.allProducts.tableHeadings =  [
                                                {
                                                  name:"Name",
                                                  filter: true
                                                },
                                                {
                                                  name:"Quality",
                                                  filter:true
                                                },
                                                {
                                                  name:"Origin",
                                                  filter:true
                                                },
                                                {
                                                  name:"Last Traded",
                                                  filter:true
                                                }
                                            ];
            vm.headerAnchor = [
                {
                    text: 'Add new Product',
                    state: 'shell.products.addProduct'
                }
            ];
        }

	}

}());
