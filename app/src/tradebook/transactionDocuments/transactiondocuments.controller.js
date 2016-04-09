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
    function TransactionDocuments(Upload,appConfig,toastr,$stateParams, tradebook, $timeout){
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
            vm.cancelDocumentUpload = cancelDocumentUpload;
            vm.documentName = '';
            vm.uploadFiles = uploadFiles;
            vm.downloadFile = downloadFile;
            vm.allFiles = [];
            vm.deleteTransactionDocuments = deleteTransactionDocuments;

            if(vm.transactionId !== 'new'){
                tradebook.getAllTransactionFiles(vm.transactionId).then(
                    function(res){
                        if(res.data.success){
                            vm.allFiles = res.data.files;
                        }
                    }
                );
            }
        }

        function downloadFile(fileId,fileName,fileType){
            tradebook.downloadTransactionFile(fileId,fileName,fileType);
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
            vm.file = file;
            var extension = file.name.split('.');
            var ext = extension[extension.length - 1];
            vm.errFile = errFiles && errFiles[0];
            if (file) {
                console.log(file);
                file.upload = Upload.upload({
                    url: appConfig.apiHost+'uploadTransactionDocument?fileName=' + vm.documentName + '.' + ext + '&transactionId=' + vm.transactionId,
                    //url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    data: {file: file, name:vm.documentName}
                });

                file.upload.then(function (response) {
                    if(response.data.success){
                        $timeout(function () {
                            file.result = response.data;
                        });
                        vm.documentAdding = false;
                        vm.allFiles.push({
                            tf_fileID: response.data.fileId,
                            tf_fileName: vm.documentName + '.' + ext,
                            tf_fileType: vm.file.type
                        });
                        vm.file=null;
                        vm.documentName = '';
                    }
                    else{
                        vm.documentAdding = false;
                        vm.documentName = '';
                        vm.file=null;
                        toastr.error(response.data.message,'Error');
                    }

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

        function deleteTransactionDocuments(fileId,index){
            tradebook.deleteTransactionFile(fileId).then(function(res){
                if(res.data.success){
                    //vm.allFiles.splice(vm.allFiles.indexOf(_.where(vm.allFiles, { 'tf_fileID': fileId})), 1);
                    vm.allFiles.splice(index,1);
                }
            });
        }
    }

}());
