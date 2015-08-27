/**
 * @ngdoc service
 * @name app.tradebook.tradebook
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.tradebook')
		.factory('tradebook', tradebook);

  /* @ngInject */
  function tradebook($http){
		return {
			testFunction: testFunction,
            getTransactionList: getTransactionList,
            getStaticDropDown: getStaticDropDown
		};

		////////////////////

    /**
     * @ngdoc
     * @name app.tradebook.tradebook#testFunction
     * @methodOf app.tradebook.tradebook
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * tradebook.testFunction(id);
     * </pre>
     * @param {int} entity id
     */

		function testFunction(id){

		}

        function getTransactionList(){
            return $http.get('datastore/transactionList.json');
        }
        function getStaticDropDown(){
            return $http.get('datastore/addTransactionBasicFilters.json');
        }
	}

}());
