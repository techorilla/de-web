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
    function TransactionDocuments(Upload,appConfig,toastr,$stateParams, tradebook){
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
            vm.transactionId = $stateParams.tran;
            vm.showDocument = false;
            vm.documentAdding = false;
            vm.saveTransactionDocument = saveTransactionDocument;
            vm.cancelDocumentUpload = cancelDocumentUpload;
            vm.documentName = '';
            vm.uploadFiles = uploadFiles;
            vm.allFiles = [];

            if(vm.transactionId !== 'new'){
                tradebook.getAllTransactionFiles(vm.transactionId).then(
                    function(res){
                        console.log(res);
                    },
                    function(err){
                        toastr.error('Unable to get transaction files','Error');
                    }
                );
            }
        }

        function uploadFiles(file, errFiles){
            if(vm.documentName === ''){
                toastr.error('Please enter document name', 'Error');
                return;
            }
            else if(vm.transactionId === 'new'){
                toastr.error('Please add/save transaction basic information first', 'Error');
                return;
            }
            file.givenfileName = vm.documentName;
            vm.file = file;
            vm.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: appConfig.apiHost+'uploadTransactionDocument?fileName=' + vm.documentName + '&transactionId=' + vm.transactionId,
                    //url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    data: {file: file, name:vm.documentName}
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        vm.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }
        }

        function cancelDocumentUpload(){
            vm.documentAdding = false;
        }

        function saveTransactionDocument(){

        }
    }

}());
