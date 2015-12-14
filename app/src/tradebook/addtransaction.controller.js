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
	function AddTransaction(tradebook, staticDropDown, $scope,tabFilter, product, country,toastr, $filter){
		var vm = this;
        init();
        vm.showBroker = false;
        vm.datePickerOpened = false;
        vm.datePickerOpened2 = false;
        vm.showTransactionInfo=false;
        vm.showContractInfo=false;
        vm.showCommission = false;
        vm.showStatus = false;
        vm.showShipment = false;
        vm.showDocument = false;
        vm.showNotes = false;

        vm.saveTransaction = saveTransaction;

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
        vm.bpConfig = {
            valueField: 'bp_ID',
            sortField: 'bp_Name',
            searchField: ['bp_Name','bp_Cont_fullName', 'bp_country'],
            maxItems:1,
            create: false,
            persist: false,
            render: {
                item: function(item, escape) {
                    var label = item.bp_Name;
                    var caption = item.bp_country;
                    var pContact = (item.bp_Cont_fullName === null)? 'No Primary Contact' : item.bp_Cont_fullName;
                    return '<div>' +
                        '<span class="dropdownLabel">' + label + '</span>' +
                        '<span class="dropdownCaption">' + ' | '+ caption + '</span>' +
                        '<span class="dropdownCaption">' + ' | '+ pContact + '</span>' +
                        '</div>';
                },
                option: function(item, escape) {
                    var label = item.bp_Name;
                    var caption = item.bp_country;
                    var pContact = (item.bp_Cont_fullName === null)? 'No Primary Contact' : item.bp_Cont_fullName;
                    return '<div>' +
                        '<span class="dropdownLabel">' + label + '</span>' +
                        '<span class="dropdownCaption">' + ' | '+ caption + '</span>' +
                        '<span class="dropdownCaption">' + ' | '+ pContact + '</span>' +
                        '</div>';
                }
            }
        };
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



        vm.newTransaction = {
             tr_bpBuyerID:'',
             tr_bpSellerID:'',
             tr_productID:'',
             tr_fileID:'',
             tr_contractID:'',
             tr_date:null,
             tr_price:0,
             tr_FCL:false,
             tr_MT:false,
             tr_conversion_FCMT: 0,
             tr_quantity: 0,
             tr_doniContract: false,
             tr_ownContract: false,
             tr_contractualBuyer:'',
             tr_broker:'',
             tr_brokerInvolved: false,
             tr_commission:0,
             tr_brokerCommission:0,
             tr_commissionType: '',
             tr_difference: 0,
             tr_discount: 0,
             tr_netCommision: 0,
             tr_shipmentDateFrom: null,
             tr_shipmentDateTo: null,
             tr_shipment30days:false,
             tr_shipmentStatus: '',
             tr_transactionStatus:'',
             tr_washOutValue:null,
             tr_shipperID: '',
             tr_transactionOtherInfo: '',
             tr_notShipped:false,
             tr_notShippedReason: '',
             tr_appropriationRecieved:false,
             tr_expectedShipment: '',
             tr_shipped: false,
             tr_dateShipped: '',
             tr_expectedArrival:null,
             tr_arrivedAtPort:false,
             tr_dateArrived: '',
             tr_portOfLoading:'',
             tr_portOfDestination:'',
             tr_origin:'',
             tr_shippingLineContactDetails:'',
             tr_voyageNumber:'',
             tr_vesselNumber:'',
             tr_packing: ''

        };

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

    function saveTransaction(){
        tradebook.addNewTransaction(vm.newTransaction,function(response){
            if (response.success) {
                toastr.success(response.message, 'Success');
                $state.go('shell.tradebook');
            }
            else{
                toastr.error(response.message, 'Error');
            }
        });
    }

    function init(){

        vm.singleConfig = {
            valueField: 'text',
            labelField: 'text',
            options: country,
            sortField: 'text',
            maxItems: 1
        };

        $scope.$watch('vm.newTransaction.tr_shipment30days',function(newVal){
            if(newVal){
                vm.newTransaction.tr_shipmentDateTo = (new Date(vm.newTransaction.tr_shipmentDateFrom));
                vm.newTransaction.tr_shipmentDateTo.setDate(vm.newTransaction.tr_shipmentDateTo.getDate() + 30);
            }
            else{
                vm.newTransaction.tr_shipmentDateTo = '';
            }
        });

        tabFilter.getDropDownBP("Buyer").then(function(res){
            vm.buyersList = res.data.data;
        });
        tabFilter.getDropDownBP("Seller").then(function(res){
            vm.sellersList = res.data.data;
        });
        tabFilter.getDropDownBP("Broker").then(function(res){
            vm.brokersList = res.data.data;
        });
        tabFilter.getDropDownBP("Shipper").then(function(res){
            vm.shippersList = res.data.data;
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
