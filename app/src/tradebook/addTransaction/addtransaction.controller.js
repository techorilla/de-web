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
    function AddTransaction(tradebook, staticDropDown,modalFactory, crud, $state,$stateParams, $scope,tabFilter,sellersList,buyersList, bpConfig, product, country,toastr, $filter, completeTransaction){
        var vm = this;
        init();
        vm.showBroker = false;
        vm.datePickerOpened = false;
        vm.datePickerOpened2 = false;
        //vm.showTransactionInfo=false;
        vm.showContractInfo=false;
        vm.showCommission = false;
        vm.showStatus = false;
        vm.showNotes = false;



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

        vm.calculateCommission = function(){
            return (vm.newTransaction.tr_commission - vm.newTransaction.tr_brokerCommission + vm.newTransaction.tr_difference - vm.newTransaction.tr_discount ) * vm.quantityValue;
        };

        function saveBasicTransaction(){
            if(vm.tran === 'new'){
                tradebook.transactionBasicCrud(vm.newTransaction,crud.CREATE).then(function(response){
                    if(response.data.success){
                        vm.newTransaction.tr_transactionID = response.data.transactionId;
                        $state.transitionTo('shell.tradebook.Transaction', {tran: response.data.transactionId}, { notify: false });
                        toastr.success('New Transaction with File No.' + vm.newTrasaction.tr_fileID + ' has been created', 'Added');
                    }
                    else{

                        toastr.error(response.data.message, 'Error');
                    }
                },function(err){
                    console.log(err);
                });
            }
            else{
                tradebook.transactionBasicCrud(vm.newTransaction,crud.UPDATE).then(function(response){
                    if(response.data.success){
                        vm.newTransaction.tr_transactionID = response.data.transactionId;
                        toastr.success('Transaction updated', 'Success');
                        vm.editMode=false;
                    }
                    else{
                        toastr.error(response.data.message, 'Error');
                    }
                },function(err){
                    toastr.error('Error');
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
                vm.subheading = 'New',
                    vm.editMode = true;
            }
            else{
                vm.newTransaction = completeTransaction.basic[0];
                vm.subheading = 'File No.'
                vm.heading = vm.newTransaction.tr_fileID;
                vm.editMode = false;
            }




            vm.singleConfig = {
                valueField: 'text',
                labelField: 'text',
                options: country,
                sortField: 'text',
                maxItems: 1
            };

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
                            toastr.success('Transaction with File No.' + vm.newTransaction.tr_fileID + 'Deleted', 'Success');
                            $state.go('shell.tradebook');
                        }
                        else{
                            toastr.error(response.data.message, 'Error');
                        }
                    },function(err){
                        toastr.error('Unable to delete transaction','Error');

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
