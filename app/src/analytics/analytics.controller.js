/**
 * @ngdoc controller
 * @name app.analytics.controller:Analytics
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.analytics')
		.controller('Analytics', Analytics);

  /* @ngInject */
	function Analytics(){
		var vm = this;

		vm.testFunction = testFunction;

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.analytics.controller:Analytics
     * @description
     * My Description rules
     */
    function testFunction(num){
			console.info('This is a test function');
		}
	}

}());
