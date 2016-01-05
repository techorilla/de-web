/**
 * @ngdoc service
 * @name app.tradebook.tradebook
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.tradebook')
		.factory('tradebook', tradebook);

  /* @ngInject */
  function tradebook($http,appConfig){
           var bpConfig = {
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
		return {
			testFunction: testFunction,
            getTransactionList: getTransactionList,
            getStaticDropDown: getStaticDropDown,
            addNewTransaction: addNewTransaction,
            deleteTransaction: deleteTransaction,
            getSingleTransactionDetails: getSingleTransactionDetails,
            getBpConfig: getBpConfig,
            getNewSecondaryTransaction: getNewSecondaryTransaction,
            getNewShipmentDetails: getNewShipmentDetails,
            getNewTransaction: getNewTransaction,
            getNewTransactionCommission:getNewTransactionCommission,
            saveBasicTransaction: saveBasicTransaction,
            getNewTransactionStatus: getNewTransactionStatus

		};

		////////////////////

    /**
     * @ngdoc
     * @name app.tradebook.tradebook#testFunction
     * @methodOf app.tradebook.tradebook
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * tradebook.testFunction(id);
     * </pre>
     * @param {int} entity id
     */
        function getNewTransaction(){
            return {
                tr_transactionID:'',
                tr_date:null,
                tr_bpBuyerID:null,
                tr_bpSellerID:null,
                tr_productID:null,
                tr_origin:null,
                tr_quantity:0,
                tr_price:0,
                tr_packing:'',
                tr_shipment_start:null,
                tr_shipment_end:null,
                tr_fileID:'',
                tr_contractID:'',
                tr_other_info:null
            };

        }

		function testFunction(id){

		}
        function getBpConfig(){
            return bpConfig;
        }
        function getNewSecondaryTransaction(){
            return {
                tr_transactionID: '',
                tr_sec_tranID:'',
                tr_sec_bpBuyerID:'',
                tr_sec_bpBuyerName:'',
                tr_sec_bpBuyerOrigin:'',
                tr_sec_bpBuyerPContact:'',
                tr_sec_bpSellerName:'',
                tr_sec_bpSellerOrigin:'',
                tr_sec_bpSellerPContact:'',
                tr_sec_bpSellerID:'',
                tr_sec_date:'',
                tr_sec_buyerPrice:'',
                tr_sec_sellerPrice:'',
                tr_sec_otherInfo:''
            };
        }

        function getNewTransactionCommission(){
            return {
                tr_transactionID:'',
                tr_brokerInvolved: false,
                tr_sellerBroker: false,
                tr_sellerBrokerID:'',
                tr_sellerBroker_comm_type:'',
                tr_sellerBroker_comm:0,
                tr_buyerBroker:false,
                tr_buyerBrokerID:'',
                tr_buyerBroker_comm_type:'',
                tr_buyerBroker_comm:0,
                tr_own_Commission:'',
                tr_ownCommissionType:'',
                tr_difference:0,
                tr_discount:0,
                tr_netCommission:0
            }
        }

        function getNewTransactionStatus(){
            return {
                tr_transactionID:'',
                tr_transactionStatus:'',
                tr_washoutValueAtPar: -1
            }
        }

        function getNewShipmentDetails(){
            return {
                tr_transactionID: '',
                tr_ship_notShipped:false,
                tr_ship_notShipped_reason:'',
                tr_ship_extension:'',
                tr_ship_appReceived:false,
                tr_expectedShipment:'',
                tr_inTransit:'',
                tr_shipped:false,
                tr_dateShipped:'',
                tr_expectedArrival:'',
                tr_transitPort:'',
                tr_ship_arrivedAtPort:false,
                tr_dateArrived:'',
                tr_actualArrived:'',
                tr_ship_BlNo:'',
                tr_ship_invoiceNo:'',
                tr_ship_invoiceAmt:'',
                tr_ship_quantity:'',
                tr_ship_vesselNo:'',
                tr_ship_primaryShipperId:'',
                tr_ship_portLoad:'',
                tr_ship_portDest:'',
                tr_ship_shipLineCont:''

            };
        }

        function getSingleTransactionDetails(id){
            var req = {
                method: 'GET',
                url: appConfig.apiHost+'getSingleTransaction?id='+id
            }
            return $http(req);
        }

        function addNewTransaction(transaction,callback){
            var req = {
                method: 'POST',
                url: appConfig.apiHost+'addNewTransaction',
                headers: {
                    'Content-Type': "application/json"
                },
                data: {transaction: transaction}
            }
            return $http(req)
                .success(function (response) {
                    callback(response);
                });
        }

        function saveBasicTransaction(newTransaction, callback){
            var req = {
                method: 'POST',
                url: appConfig.apiHost+'addNewTransaction/basic',
                headers: {
                    'Content-Type': "application/json"
                },
                data: {newTransaction: newTransaction}
            }
            return $http(req)
                .success(function (response) {
                    callback(response);
                });
        }

        function deleteTransaction(){

        }

        function getTransactionList(){
            var req = {
                method: 'GET',
                url: appConfig.apiHost+'getTransactionTable',
                headers: {
                    'Content-Type': "application/json"
                }
            }
            return $http(req);
        }
        function getStaticDropDown(){
            return $http.get('datastore/addTransactionBasicFilters.json');
        }
	}

}());
