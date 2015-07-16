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
	function AddTransaction($scope, navigation,staticDropDown){
        console.log(staticDropDown.shipmentStatus);
		var vm = this;
		vm.testFunction = testFunction;
        vm.shipmentStatusConfig = {
            options: staticDropDown.shipmentStatus,
            create: true,
            sortField: 'text',
            maxItems:1
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
        vm.buyerConfig = {
            options: staticDropDown.commissionType,
            create: true,
            sortField: 'text',
            maxItems:1
        };
        vm.sellerConfig = {
            options: staticDropDown.commissionType,
            create: true,
            sortField: 'text',
            maxItems:1
        };
        vm.productConfig = {
            options: staticDropDown.commissionType,
            create: true,
            sortField: 'text',
            maxItems:1
        }

    //=======================================================
  //Single Item Select
  //=======================================================
  $scope.single = null;
  
  $scope.singleConfig = {
    options: [{value: 1, text: 'Chuck Testa', email:'chucktesla@gmail,com'}, {value: 2, text:'Nikola Tesla',email:'nuckTesla@gmail.com'}],
    create: true,
    sortField: 'text',
    maxItems: 1
  }

     vm.newTransaction = {
         buyer: '',
         seller: '',
         date: '',
         contractType: '',
         product:'',
         quality: {
            mt: '',
            fcl: '',
            oneFcl: ''
         },
         rate: '',
         fileNo: '',
         contractNo: '',
         commissionDetails: {
             brokerInvolved: false,
             broker:'',
             commissionType: '',
             brokerCommission: '',
             dif: '',
             netCommission: ''
         },
         shipmentStatus: '',
         transactionStatus: '',
         notes: [

         ]
     }

     vm.newTransaction.notes = new notes();

     function notes(note, time, addedBy){
            this.note = note | '',
            this.time = navigation.getTime();
            this.addedBy = (navigation.getCurrentUser()).id;
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

    function testFunction(num){
			console.info('This is a test function');
		}
	}

}());
