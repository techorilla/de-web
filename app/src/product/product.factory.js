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
  function product($http,appConfig){
		return {
            getAllProducts: getAllProducts,
            getProductById:getProductById
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

		function getAllProducts(){
            return $http.get(appConfig.apiHost+'getAllproducts');
        }

        function getProductById(id){
            return $http.get('datastore/productDetail.json');
        }
	}

}());
