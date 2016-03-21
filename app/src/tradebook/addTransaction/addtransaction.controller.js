/**
 * @ngdoc controller
 * @name app.tradebook.controller:AddTransaction
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.tradebook')
        .controller('AddTransaction', AddTransaction);

    /* @ngInject */
    function AddTransaction(tradebook, staticDropDown,modalFactory, crud, $state,$stateParams, $scope,tabFilter,sellersList,buyersList, bpConfig, product, originConfig,toastr, appEvents, completeTransaction){
        var vm = this;
        init();




        vm.commissionTypeConfig = {
            options: staticDropDown.commissionType,
            create: true,
            sortField: 'text',
            valueField: 'text',
            labelField: 'text',
            maxItems:1
        };
        vm.packingConfig = {
            options: [
                {text: 'Bulk'}, {text:'Bagged'}
            ],
            create: true,
            sortField: 'text',
            valueField: 'text',
            labelField: 'text',
            maxItems:1
        };
        vm.bpConfig = bpConfig;
        vm.productConfig = tradebook.getProductConfig();
        vm.quantityValue = 0;



        function saveBasicTransaction(){
            if(vm.tran === 'new'){
                tradebook.transactionBasicCrud(vm.newTransaction,crud.CREATE).then(function(response){
                    if(response.data.success){
                        vm.newTransaction.tr_transactionID = response.data.transactionId;
                        $state.transitionTo('shell.tradebook.Transaction', {tran: response.data.transactionId}, { notify: false });
                        vm.editMode=false;
                        toastr.success('New Transaction with File No.' + vm.newTransaction.tr_fileID + ' has been created', 'Added');
                        $stateParams.tran = response.data.transactionId;
                        vm.tran =  response.data.transactionId;
                    }
                });
            }
            else{
                tradebook.transactionBasicCrud(vm.newTransaction,crud.UPDATE).then(function(response){
                    if(response.data.success){
                        $scope.$broadcast(appEvents.TransactionBasicChanged);
                        vm.newTransaction.tr_transactionID = response.data.transactionId;
                        vm.editMode=false;
                    }
                },function(err){
                    vm.editMode=false;
                });
            }


        }

        function init(){
            vm.tran = $stateParams.tran;
            vm.saveBasicTransaction = saveBasicTransaction;
            vm.editBasicTransaction= editBasicTransaction;
            vm.deleteCompleteTransaction = deleteCompleteTransaction;
            vm.stateParams = $stateParams;
            vm.editMode = (completeTransaction === null);
            if(vm.tran === 'new'){
                vm.newTransaction = tradebook.getNewTransaction();
                vm.heading = 'Transaction';
                vm.subheading = 'New';
                vm.editMode = true;
            }
            else{
                vm.newTransaction = completeTransaction.basic[0];
                vm.subheading = 'File No.';
                vm.heading = vm.newTransaction.tr_fileID;
                vm.editMode = false;
            }




            vm.singleConfig = originConfig;

            $scope.$watch('vm.newTransaction.tr_shipment30days',function(newVal){
                if(newVal){
                    vm.newTransaction.tr_shipment_end = (new Date(vm.newTransaction.tr_shipment_start));
                    vm.newTransaction.tr_shipment_end.setDate(vm.newTransaction.tr_shipment_end.getDate() + 30);
                }
                else{
                    vm.newTransaction.tr_shipmentDateTo = '';
                }
            });
            vm.sellersList = sellersList;
            vm.buyersList = buyersList;


            tabFilter.getDropDownBP("Broker").then(function(res){
                vm.brokersList = res.data.data;
            });
            product.getAllProducts().then(function(res){
                vm.productList = res.data;
            });
        }

        /////////////////////

        /**
         * @ngdoc method
         * @name testFunction
         * @param {number} num number is the number of the number
         * @methodOf app.tradebook.controller:AddTransaction
         * @description
         * My Description rules
         */
        function deleteCompleteTransaction(){
            modalFactory.alertModal(vm.newTransaction.tr_fileID,'Transaction', 'Delete').then(function(res){
                if(res){
                    tradebook.transactionBasicCrud(vm.newTransaction,crud.DELETE).then(function(response){
                        if(response.data.success){
                            toastr.success('Transaction with File No.' + vm.newTransaction.tr_fileID + ' deleted.', 'Success');
                            $state.go('shell.tradebook');
                        }
                    });
                }
            });
        }

        function editBasicTransaction(){
            vm.editMode = true;
            vm.temp= angular.copy(vm.newTransaction);
        }

    }

}());
