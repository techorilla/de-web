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
	function AllProductPdf($scope, pdf, SaveAs  ){
        //console.log(pdf);
        var vm = this;
        vm.file = new Blob([pdf.data], { type: 'application/pdf' });
        vm.fileURL = URL.createObjectURL(vm.file);
        vm.fileName = 'AllProductsDetails-DhoniGroup.pdf';
        init();
        function init(){
            vm.pdf = pdf;


            console.log(vm.x);
        }

        vm.message = 'ALL PDF';
        $scope.file = vm.file;
        $scope.pdfName = vm.fileName;
        $scope.pdfUrl = vm.fileURL;
        $scope.scroll = 0;
        $scope.loading = 'loading';
        $scope.download = function(){
            SaveAs.download(vm.file,vm.fileName);
        };

        $scope.getNavStyle = function(scroll) {
            if(scroll > 100) return 'pdf-controls fixed';
            else return 'pdf-controls';
        }

        $scope.onError = function(error) {
            console.log(error);
        }

        $scope.onLoad = function() {
            $scope.loading = '';
        }

        $scope.onProgress = function(progress) {
            console.log(progress);
        }


    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.product.controller:AllProductPdf
     * @description
     * My Description rules
     */

	}

}());
