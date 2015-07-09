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
	function Product(product){
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
        console.info('This is a test function');
            vm.headerAnchor = [
                {
                    text: 'Add new Product',
                    state: 'shell.products.addProduct'
                }
            ];
            console.log(vm.headerAnchor);
        }
    function testFunction(num){
			console.info('This is a test function');
		}

	}

}());
