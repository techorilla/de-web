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
  function tradebook($http,appConfig){
		return {
			testFunction: testFunction,
            getTransactionList: getTransactionList,
            getStaticDropDown: getStaticDropDown,
            addNewTransaction: addNewTransaction,
            deleteTransaction: deleteTransaction

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

        function addNewTransaction(transaction,callback){
            var req = {
                method: 'POST',
                url: appConfig.apiHost+'addNewTransaction',
                headers: {
                    'Content-Type': "application/json"
                },
                data: {transaction: transaction}
            }
            return $http(req)
                .success(function (response) {
                    callback(response);
                });
        }

        function deleteTransaction(){

        }

        function getTransactionList(){
            var req = {
                method: 'GET',
                url: appConfig.apiHost+'getTransactionTable',
                headers: {
                    'Content-Type': "application/json"
                }
            }
            return $http(req);
        }
        function getStaticDropDown(){
            return $http.get('datastore/addTransactionBasicFilters.json');
        }
	}

}());
