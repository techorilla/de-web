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
        vm.allProductData = ''; 
        vm.testFunction = testFunction;

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
            vm.orderByReverse = false
            vm.allProducts = allProducts;
            vm.allProducts.tableHeadings =  [
                                                {
                                                  name:"Product Code",
                                                  filter: true
                                                },
                                                {
                                                  name:"Name",
                                                  filter:true
                                                },
                                                {
                                                  name:"Quality",
                                                  filter:true
                                                },
                                                {
                                                  name:"Created By",
                                                  filter:true
                                                },
                                                {
                                                  name:"Created On",
                                                  filter:false
                                                },
                                                {
                                                  name:"Last Updated By",
                                                  fitler:false
                                                },
                                                {
                                                  name:"Last Updated On",
                                                  filter:false
                                                }
                                            ];
            vm.headerAnchor = [
                {
                    text: 'Add new Product',
                    state: 'shell.products.addProduct'
                }
            ];
            vm.invertOrderByReverse = function(){
                vm.orderByReverse = !vm.orderByReverse;
            }
        }
    function testFunction(num){
			console.info('This is a test function');
		}

	}

}());
