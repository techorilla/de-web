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
    function TransactionNotes($stateParams, tradebook,toastr,crud, authentication, $rootScope){
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
        function init() {
            vm.showNotes = false;
            vm.transactionId = $stateParams.tran;
            vm.transactionNotes = [];
            vm.userService = authentication;
            vm.newTransactionNote = tradebook.getNewTransactionNotes();
            if (vm.transactionId !== 'new') {
                vm.newTransactionNote.tr_transactionID = vm.transactionId;
                tradebook.getSingleTransactionNotes(vm.transactionId).then(function(res){
                    if(res.data.success){
                        vm.transactionNotes = res.data.notes;
                    }
                },function (error){
                    toastr.error('Unable to get transaction notes.','Error')
                });
            }
            vm.addTransactionNote = addTransactionNote;
        }

        function addTransactionNote(){
            tradebook.transactionNotesCrud(vm.newTransactionNote,crud.CREATE).then(
                function(res){
                    if(res.data.success){
                        vm.newTransactionNote.tr_tranNoteID = res.data.noteId;
                        vm.newTransactionNote.tr_createdBy = $rootScope.globals.currentUser.userId;
                        vm.newTransactionNote.fullName = vm.userService.getFullUserName();
                        vm.newTransactionNote.tr_createdOn = new Date().toJSON().slice(0,10);
                        vm.transactionNotes.push(vm.newTransactionNote);
                        vm.newTransactionNote = tradebook.getNewTransactionNotes();
                        vm.newTransactionNote.tr_transactionID = vm.transactionId;
                        $scope.$broadcast('rebuild:me');
                        toastr.success(res.data.message,'Success')
                    }
                    else{
                        toastr.error(res.data.message,'Error');
                    }
                }, function(err){
                    toastr.error('Unable to get add transaction notes','Error');
                }
            );
        }
    }

}());
