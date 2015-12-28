/**
 * @ngdoc controller
 * @name app.tradebook.controller:TransactionDocuments
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.tradebook')
		.controller('TransactionDocuments', TransactionDocuments);

  /* @ngInject */
	function TransactionDocuments(){
		var vm = this;
        init();

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.tradebook.controller:TransactionDocuments
     * @description
     * My Description rules
     */
        function init(){
            vm.showDocument = false;
		}
	}

}());
