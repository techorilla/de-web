/**
 * @ngdoc service
 * @name app.analytics.analytics
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.analytics')
		.factory('analytics', analytics);

  /* @ngInject */
  function analytics(){
		return {
			testFunction: testFunction
		};

		////////////////////

    /**
     * @ngdoc
     * @name app.analytics.analytics#testFunction
     * @methodOf app.analytics.analytics
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * analytics.testFunction(id);
     * </pre>
     * @param {int} entity id
     */

		function testFunction(id){
			console.info('This is a test function');
		}
	}

}());
