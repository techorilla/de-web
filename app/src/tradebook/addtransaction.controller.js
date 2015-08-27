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
	function AddTransaction(navigation, staticDropDown, $scope, filterFromDb){
		var vm = this;
        vm.showBroker = false;
        vm.datePickerOpened = false;
        vm.saveTransaction = saveTransaction;
        vm.shipmentStatusConfig = {
            options: staticDropDown.shipmentStatus,
            create: true,
            sortField: 'text',
            maxItems: 1
        };
        vm.transactionStatusConfig = {
            options: staticDropDown.transactionStatus,
            create: true,
            sortField: 'text',
            maxItems:1
        };
        vm.commissionTypeConfig = {
            options: staticDropDown.commissionType,
            create: true,
            sortField: 'text',
            maxItems:1
        };
        vm.contractualBuyerConfig = {
            options: filterFromDb.contractualBuyer,
            create: true,
            sortField: 'text',
            maxItems: 1
        };
        vm.buyerConfig = {
            options: filterFromDb.buyers,
            create: true,
            sortField: 'text',
            maxItems:1
        };
        vm.sellerConfig = {
            options:filterFromDb.sellers,
            create: true,
            sortField: 'text',
            maxItems:1
        };
        vm.brokerConfig = {
            options:filterFromDb.brokers,
            create: true,
            sortField: 'text',
            maxItems:1
        };
        vm.productConfig = {
            options:filterFromDb.products,
            create: true,
            sortField: 'text',
            maxItems:1
        };
        vm.quantityValue = 0;
        vm.openDatePicker = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.datePickerOpened = true;
        };
        vm.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        vm.newTransaction = {
             buyer: '',
             seller: '',
             date: navigation.getTime(),
             contractType: '',
             product:'',
             quantity: {
                mt: true,
                fcl: false,
                oneFcl: 25,
                value:0
             },
             rate: '',
             fileNo: '',
             contractNo: '',
             doniContract: '',
             ownContract: '',
             contractualBuyer: '',
             commissionDetails: {
                 broker: '',
                 brokerInvolved: false,
                 comm:0,
                 commType: '',
                 brokerComm: 0,
                 discount: 0,
                 diff: 0,
                 netComm: 0
             },
             shipmentStatus: '',
             transactionStatus: '',
             notes: [


             ]
        };

        vm.calculateCommission = function(){
            return (vm.newTransaction.commissionDetails.comm - vm.newTransaction.commissionDetails.brokerComm + vm.newTransaction.commissionDetails.diff - vm.newTransaction.commissionDetails.discount ) * vm.quantityValue;
        };

        $scope.$watch('vm.newTransaction.commissionDetails.comm', function( value ) {
            vm.newTransaction.commissionDetails.netComm = vm.calculateCommission();
        });
        $scope.$watch('vm.newTransaction.commissionDetails.diff', function( value ) {
            vm.newTransaction.commissionDetails.netComm = vm.calculateCommission();
        });
        $scope.$watch('vm.newTransaction.commissionDetails.brokerComm', function( value ) {
            vm.newTransaction.commissionDetails.netComm = vm.calculateCommission();
        });
        $scope.$watch('vm.newTransaction.commissionDetails.discount', function( value ) {
            vm.newTransaction.commissionDetails.netComm = vm.calculateCommission();
        });
        $scope.$watch('vm.quantityValue', function( value ) {
            vm.newTransaction.commissionDetails.netComm = vm.calculateCommission();
        });

        $scope.$watch('vm.newTransaction.doniContract', function( value ) {
            if(value){
                vm.newTransaction.ownContract = false;
            }
        });
        $scope.$watch('vm.newTransaction.ownContract', function( value ) {
            if(value){
                vm.newTransaction.doniContract = false;
            }
        });
        $scope.$watch('vm.newTransaction.quantity.mt', function( value ) {
            if(value){
                vm.newTransaction.quantity.fcl = false;
                vm.quantityValue = vm.newTransaction.quantity.value;
            }
        });
        $scope.$watch('vm.newTransaction.quantity.fcl', function( value ) {
            if(value){
                vm.newTransaction.quantity.mt = false;
                vm.quantityValue = vm.newTransaction.quantity.value * vm.newTransaction.quantity.oneFcl;
            }
        });
        $scope.$watch('vm.newTransaction.quantity.value',function(value){
            if(vm.newTransaction.quantity.mt){
                vm.quantityValue = vm.newTransaction.quantity.value;
            }
            if(vm.newTransaction.quantity.fcl){
                vm.quantityValue = vm.newTransaction.quantity.value * vm.newTransaction.quantity.oneFcl;
            }
        });

     vm.newTransaction.notes = new Notes();

    function Notes(note, time, addedBy){


       }

    function saveTransaction(){

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


	}

}());
