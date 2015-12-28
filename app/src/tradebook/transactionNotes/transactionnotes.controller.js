/**
 * @ngdoc controller
 * @name app.tradebook.controller:TransactionNotes
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.tradebook')
		.controller('TransactionNotes', TransactionNotes);

  /* @ngInject */
	function TransactionNotes(){
		var vm = this;
        init();

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.tradebook.controller:TransactionNotes
     * @description
     * My Description rules
     */
        function init(){
            vm.showNotes = false;
		}
	}

}());
