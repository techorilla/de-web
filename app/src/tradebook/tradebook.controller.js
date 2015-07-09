/**
 * @ngdoc controller
 * @name app.tradebook.controller:Tradebook
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.tradebook')
		.controller('Tradebook', Tradebook);

  /* @ngInject */
	function Tradebook(){
		var vm = this;
        init();
		vm.testFunction = testFunction;

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.tradebook.controller:Tradebook
     * @description
     * My Description rules
     */
     function init(){
            vm.headerAnchor = [
                {
                    text: 'Add new Transaction',
                    state: 'shell.tradebook.newTransaction'
                }
            ];
        }
    function testFunction(num){
			console.info('This is a test function');
		}
	}

}());
