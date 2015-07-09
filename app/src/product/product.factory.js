/**
 * @ngdoc service
 * @name app.product.product
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.product')
		.factory('product', product);

  /* @ngInject */
  function product(){
		return {
			testFunction: testFunction,
            getAllProducts: getAllProducts
		};

		////////////////////

    /**
     * @ngdoc
     * @name app.product.product#testFunction
     * @methodOf app.product.product
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * product.testFunction(id);
     * </pre>
     * @param {int} entity id
     */

		function testFunction(id){
			console.info('This is a test function');
		}

        function getAllProducts(){
            return $http.get('datastore/allProducts.json');
        }
	}

}());
