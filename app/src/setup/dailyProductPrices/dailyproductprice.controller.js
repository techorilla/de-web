/**
 * @ngdoc controller
 * @name app.setup.controller:DailyProductPrice
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.setup')
		.controller('DailyProductPrice', DailyProductPrice);

  /* @ngInject */
	function DailyProductPrice(){
		var vm = this;

		vm.testFunction = testFunction;

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.setup.controller:DailyProductPrice
     * @description
     * My Description rules
     */
    function testFunction(num){
			console.info('This is a test function');
		}
	}

}());
