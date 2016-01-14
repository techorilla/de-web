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
    function TransactionNotes($stateParams, tradebook,toastr,crud, authentication, $anchorScroll, $location){
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

                $('#noteList').mCustomScrollbar("scrollTo","last",{
                    scrollEasing:"easeOut"
                });
            }
            vm.addTransactionNote = addTransactionNote;
        }

        function addTransactionNote(){
            tradebook.transactionNotesCrud(vm.newTransactionNote,crud.CREATE).then(
                function(res){
                    if(res.data.success){
                        vm.newTransactionNote.tr_tranNoteID = res.data.noteId;
                        vm.newTransactionNote.tr_createdBy = authentication.getUserId();
                        vm.newTransactionNote.fullName = authentication.getFullUserName();
                        vm.newTransactionNote.userID = new Date().toJSON().slice(0,10);
                        vm.transactionNotes.push(vm.newTransactionNote);
                        vm.newTransactionNote = tradebook.getNewTransactionNotes();
                        vm.newTransactionNote.tr_transactionID = vm.transactionId;
                        $('#noteList').mCustomScrollbar("scrollTo","last",{
                            scrollEasing:"easeOut"
                        });
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
