/**
 * @ngdoc service
 * @name app.businessPartner.businessPartner
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.businessPartner')
		.factory('businessPartner', businessPartner);

  /* @ngInject */
  function businessPartner(){
		return {
			testFunction: testFunction
		};

		////////////////////

    /**
     * @ngdoc
     * @name app.businessPartner.businessPartner#testFunction
     * @methodOf app.businessPartner.businessPartner
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * businessPartner.testFunction(id);
     * </pre>
     * @param {int} entity id
     */

		function testFunction(id){
			console.info('This is a test function');
		}
	}

}());
