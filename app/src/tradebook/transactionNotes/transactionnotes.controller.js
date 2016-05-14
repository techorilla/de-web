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
            vm.deleteTransactionNote = deleteTransactionNote;
            vm.editTransactionNote = editTransactionNote;
            vm.newTransactionNote = tradebook.getNewTransactionNotes();
            if (vm.transactionId !== 'new') {
                vm.newTransactionNote.tr_transactionID = vm.transactionId;
                tradebook.getSingleTransactionNotes(vm.transactionId).then(function(res){
                    if(res.data.success){
                        vm.transactionNotes = res.data.notes;
                        vm.newTransactionNote = tradebook.getNewTransactionNotes();
                        vm.newTransactionNote.tr_transactionID = vm.transactionId;

                    }
                });

                $('#noteList').mCustomScrollbar("scrollTo","last",{
                    scrollEasing:"easeOut"
                });
            }
            vm.addTransactionNote = addTransactionNote;
        }
        function deleteTransactionNote(index){
            tradebook.transactionNotesCrud(vm.transactionNotes[index],crud.DELETE).then(
                function(res){
                    if(res.data.success){
                        vm.transactionNotes.splice(index,1);
                        $('#noteList').mCustomScrollbar("scrollTo","last",{
                            scrollEasing:"easeOut"
                        });
                        toastr.success(res.data.message,'Success')
                    }
                }
            );
        }

        function editTransactionNote(index){
            vm.newTransactionNote = vm.transactionNotes[index];
            vm.transactionNotes.splice(index,1);
            vm.editMode = true;
        }



        function addTransactionNote(){
            var op = (vm.editMode) ? crud.UPDATE : crud.CREATE;
            if(vm.newTransactionNote.tr_transactionNotes !== ''){
                tradebook.transactionNotesCrud(vm.newTransactionNote,op).then(
                    function(res){
                        if(res.data.success){
                            if(op === crud.CREATE){
                                vm.newTransactionNote = res.data.noteId;
                                vm.newTransactionNote.tr_createdBy = authentication.getUserId();
                                vm.newTransactionNote.fullName = authentication.getFullUserName();
                                vm.newTransactionNote.userID = authentication.getUserId();
                                vm.transactionNotes.push(vm.newTransactionNote);
                                vm.newTransactionNote = tradebook.getNewTransactionNotes();
                                vm.newTransactionNote.tr_transactionID = vm.transactionId;
                                $('#noteList').mCustomScrollbar("scrollTo","last",{
                                    scrollEasing:"easeOut"
                                });
                            }
                            else{
                                vm.transactionNotes.push(vm.newTransactionNote);
                                vm.newTransactionNote = tradebook.getNewTransactionNotes();
                                vm.newTransactionNote.tr_transactionID = vm.transactionId;
                            }

                            toastr.success(res.data.message,'Success')
                        }
                    }
                );

            }
            else{
                toastr.error('Note is empty!', 'Error');
            }
            vm.editMode = false;
        }
    }

}());
