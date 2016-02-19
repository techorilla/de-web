/**
 * @ngdoc service
 * @name app.common.routing
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.common')
		.factory('routing', routing);

  /* @ngInject */
  function routing(){
		return {
            getRecentlyViewedItems: getRecentlyViewedTransactions,
            addRecentlyViewItems: addRecentlyViewItems
		};

        function getRecentlyViewedTransactions(){

        }

        function addRecentlyViewItems(pageTitle){

        }


	}

}());
