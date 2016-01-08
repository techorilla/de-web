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
	function AddTransaction(tradebook, staticDropDown, crud, $state,$stateParams, $scope,tabFilter,sellersList,buyersList, bpConfig, product, country,toastr, $filter){
		var vm = this;
        init();
        vm.showBroker = false;
        vm.datePickerOpened = false;
        vm.datePickerOpened2 = false;
        vm.showTransactionInfo=false;
        vm.showContractInfo=false;
        vm.showCommission = false;
        vm.showStatus = false;
        vm.showNotes = false;
        vm.saveBasicTransaction = saveBasicTransaction;

        vm.transactionStatusConfig = {
            options: staticDropDown.transactionStatus,
            create: true,
            sortField: 'value',
            valueField: 'text',
            labelField: 'text',
            maxItems:1
        };
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
        vm.productConfig = {
            valueField: 'id',
            sortField: 'name',
            searchField: ['name','origin', 'quality'],
            maxItems:1,
            create: false,
            persist: false,
            render: {
                item: function(item, escape) {
                    console.log(item);
                    var label = item.name;
                    var caption = item.origin;
                    var pContact = (item.quality === null)? 'No Quality Tags' : item.quality;
                    return '<div>' +
                        '<span class="dropdownLabel">' + label + '</span>' +
                        '<span class="dropdownCaption">' + ' | '+ caption + '</span>' +
                        '<span class="dropdownCaption">' + ' | '+ pContact + '</span>' +
                        '</div>';
                },
                option: function(item, escape) {
                    var label = item.name;
                    var caption = item.origin;
                    var pContact = (item.quality === null)? 'No Quality Tags' : item.quality;
                    return '<div>' +
                        '<span class="dropdownLabel">' + label + '</span>' +
                        '<span class="dropdownCaption">' + ' | '+ caption + '</span>' +
                        '<span class="dropdownCaption">' + ' | '+ pContact + '</span>' +
                        '</div>';
                }
            }
        };
        vm.quantityValue = 0;

        vm.calculateCommission = function(){
            return (vm.newTransaction.tr_commission - vm.newTransaction.tr_brokerCommission + vm.newTransaction.tr_difference - vm.newTransaction.tr_discount ) * vm.quantityValue;
        };

        $scope.$watch('vm.newTransaction.tr_brokerInvolved', function( value ) {
            if(!value){
                vm.newTransaction.tr_broker = '';
            }
        });

        $scope.$watch('vm.newTransaction.tr_commission', function( value ) {
            vm.newTransaction.tr_netCommision = vm.calculateCommission();
        });
        $scope.$watch('vm.newTransaction.tr_difference', function( value ) {
            vm.newTransaction.tr_netCommision = vm.calculateCommission();
        });
        $scope.$watch('vm.newTransaction.tr_brokerCommission', function( value ) {
            vm.newTransaction.tr_netCommision = vm.calculateCommission();
        });
        $scope.$watch('vm.newTransaction.tr_discount', function( value ) {
            vm.newTransaction.tr_netCommision = vm.calculateCommission();
        });
        $scope.$watch('vm.quantityValue', function( value ) {
            vm.newTransaction.tr_netCommision = vm.calculateCommission();
        });

        $scope.$watch('vm.newTransaction.tr_doniContract', function( value ) {
            if(value){
                vm.newTransaction.ownContract = false;
            }
        });
        $scope.$watch('vm.newTransaction.tr_ownContract', function( value ) {
            if(value){
                vm.newTransaction.tr_doniContract = false;
            }
        });
        $scope.$watch('vm.newTransaction.tr_MT', function( value ) {
            if(value){
                vm.newTransaction.tr_FCL = false;
                vm.quantityValue = vm.newTransaction.tr_quantity;
            }
        });
        $scope.$watch('vm.newTransaction.tr_FCL', function( value ) {
            if(value){
                vm.newTransaction.tr_MT = false;
                vm.quantityValue = vm.newTransaction.tr_quantity * vm.newTransaction.tr_conversion_FCMT;
            }
        });
        $scope.$watch('vm.newTransaction.tr_quantity',function(value){
            if(vm.newTransaction.tr_MT){
                vm.quantityValue = vm.newTransaction.tr_quantity;
            }
            if(vm.newTransaction.tr_FCL){
                vm.quantityValue = vm.newTransaction.tr_quantity * vm.newTransaction.tr_conversion_FCMT;
            }
        });

     vm.newTransaction.notes = '';


    function saveBasicTransaction(){
        tradebook.transactionBasicCrud(vm.newTransaction,crud.CREATE).then(function(response){
            if(response.data.success){
                toastr.success(response.data.message, 'Success');
                vm.newTransaction.tr_transactionID = response.data.transactionId;
                $state.transitionTo('shell.tradebook.Transaction', {tran: response.data.transactionId}, { notify: false });
            }
            else{

                toastr.error(response.data.message, 'Error');
            }
        },function(err){
            console.log(err);
        });
    }

    function init(){
        vm.tran = $stateParams.tran;

        vm.newTransaction = tradebook.getNewTransaction();

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


	}

}());
