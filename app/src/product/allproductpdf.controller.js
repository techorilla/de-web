/**
 * @ngdoc controller
 * @name app.product.controller:AllProductPdf
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.product')
		.controller('AllProductPdf', AllProductPdf);

  /* @ngInject */
	function AllProductPdf(){
		var vm = this;
        vm.message = 'ALL PDF';

        vm.generatePDF = generatePDF;

		vm.testFunction = testFunction;

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.product.controller:AllProductPdf
     * @description
     * My Description rules
     */
    function generatePDF(){
        var doc = new jsPDF();
    }
    function testFunction(num){
			console.info('This is a test function');
		}
	}

}());
