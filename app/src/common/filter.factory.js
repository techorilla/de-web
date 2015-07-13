/**
 * @ngdoc service
 * @name app.common.filter
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.common')
		.factory('tabFilter', filter);

  /* @ngInject */
  function filter($http){
		return {
			testFunction: testFunction,
            getBuyerFilter: getBuyerFilter,
            getSellerFilter:getSellerFilter,
            getProductFilter:getProductFilter,
            getBusinessPartnerTypes: getBusinessPartnerTypes,
            getTransactionStatus: getTransactionStatus,
            getBuyerContractTypes: getBuyerContractTypes,
            getAllCountries: getAllCountries
		};

		////////////////////

    /**
     * @ngdoc
     * @name app.common.filter#testFunction
     * @methodOf app.common.filter
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * filter.testFunction(id);
     * </pre>
     * @param {int} entity id
     */
        function getBuyerFilter(){
            return $http.get('datastore/filterBuyer.json');
        }
        function getAllCountries(){
            return $http.get('datastore/country.json');
        }
        function getSellerFilter(){
            return $http.get('datastore/filterSeller.json');
        }
        function getProductFilter(){
            return $http.get('datastore/allProducts.json');
        }
        function getBusinessPartnerTypes(){
            return $http.get('datastore/businessPartnerTypes.json');
        }
        function getBuyerContractTypes(){
            return $http.get('datastore/buyerContractTypes.json')
        }
        function getTransactionStatus(){
            return $http.get('datastore/transactionStatus.json');
        }
		function testFunction(id){
			console.info('This is a test function');
		}
	}

}());
