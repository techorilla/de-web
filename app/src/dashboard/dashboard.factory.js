/**
 * @ngdoc service
 * @name app.dashboard.dashboard
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.dashboard')
		.factory('dashboard', dashboard);

  /* @ngInject */
  function dashboard(){
		return {
			testFunction: testFunction
		};

		////////////////////

    /**
     * @ngdoc
     * @name app.dashboard.dashboard#testFunction
     * @methodOf app.dashboard.dashboard
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * dashboard.testFunction(id);
     * </pre>
     * @param {int} entity id
     */

		function testFunction(id){
			console.info('This is a test function');
		}
	}

}());
