/**
 * @ngdoc service
 * @name app.common.dataService
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.common')
		.factory('dataService', dataService);

  /* @ngInject */
  function dataService(){
		return {
			testFunction: testFunction
		};

		////////////////////

    /**
     * @ngdoc
     * @name app.common.dataService#testFunction
     * @methodOf app.common.dataService
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * dataService.testFunction(id);
     * </pre>
     * @param {int} entity id
     */

		function testFunction(id){
			console.info('This is a test function');
		}
	}

}());
