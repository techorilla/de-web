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
  function tradebook($http,appConfig,crud){
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
            saveBasicTransaction: saveBasicTransaction,
            getTransactionList: getTransactionList,
            getStaticDropDown: getStaticDropDown,
            addNewTransaction: addNewTransaction,
            getSingleTransactionDetails: getSingleTransactionDetails,
            getSingleTransactionSec: getSingleTransactionSec,
            getSingleTransactionCommission: getSingleTransactionCommission,
            getSingleTransactionNotes: getSingleTransactionNotes,
            getAllTransactionFiles: getAllTransactionFiles,
            getBpConfig: getBpConfig,

            deleteTransactionFile: deleteTransactionFile,
            downloadTransactionFile: downloadTransactionFile,

            getNewSecondaryTransaction: getNewSecondaryTransaction,
            getNewShipmentDetails: getNewShipmentDetails,
            getNewTransaction: getNewTransaction,
            getNewTransactionCommission:getNewTransactionCommission,
            getNewTransactionStatus: getNewTransactionStatus,
            getNewTransactionContract: getNewTransactionContract,
            getNewTransactionNotes: getNewTransactionNotes,
            getNewTransactionDocuments: getNewTransactionDocuments,
            getNewTransactionDocument: getNewTransactionDocument,

            transactionBasicCrud: transactionBasicCrud,
            transactionNotesCrud: transactionNotesCrud,
            transactionCommissionCrud: transactionCommissionCrud,
            transactionShipmentCrud: transactionShipmentCrud,
            transactionSecondaryCrud: transactionSecondaryCrud,
            transactionStatusCrud: transactionStatusCrud,
            transactionContractCrud: transactionContractCrud,
            transactionDocumentCrud: transactionDocumentCrud

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
        function getNewTransaction(tranID){
            return {
                tr_transactionID: (tranID) ? tranID : null,
                tr_date:null,
                tr_bpBuyerID:null,
                tr_bpSellerID:null,
                tr_productID:null,
                tr_origin:null,
                tr_quantity:null,
                tr_price:null,
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
        function getProductConfig(){
            return {
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
        }
        function getBpConfig(){
            return bpConfig;
        }
        function getNewSecondaryTransaction(){
            return {
                tr_transactionID: null,
                tr_sec_tranID:null,
                tr_sec_bpBuyerID:null,
                tr_sec_bpBuyerName:'',
                tr_sec_bpBuyerOrigin:'',
                tr_sec_bpBuyerPContact:'',
                tr_sec_bpSellerName:'',
                tr_sec_bpSellerOrigin:'',
                tr_sec_bpSellerPContact:'',
                tr_sec_bpSellerID:null,
                tr_sec_date:null,
                tr_sec_buyerPrice:null,
                tr_sec_sellerPrice:null,
                tr_sec_otherInfo:''
            };
        }

        function getNewTransactionDocument(){
                return {
                    tf_transactionID: null,
                    tf_fileID: null,
                    tf_file: null,
                    tf_fileType: null,
                    tf_fileName: null
                };
        }

        function getNewTransactionCommission(){
            return {
                tr_transactionID:null,
                tr_brokerInvolved: false,
                tr_sellerBroker: false,
                tr_sellerBrokerID:null,
                tr_buyerBroker:false,
                tr_buyerBrokerID:null,
                tr_buyerBroker_comm_type: 'Fixed',
                tr_buyerBroker_comm: 0,
                tr_own_Commission:0,
                tr_ownCommissionType:'Fixed',
                tr_difference:0,
                tr_discount:0,
                tr_netCommission:0
            };
        }

        function getNewTransactionStatus(){
            return {
                tr_transactionID:'',
                tr_transactionStatus:'',
                tr_washoutValueAtPar: -1
            };
        }

        function getNewTransactionContract(){
            return {
                tr_transactionID:'',
                tr_doniContract:false,
                tr_ownContract:false,
                tr_ContractualBuyer:''
            };
        }
        function getNewTransactionNotes(){
            return{
                tr_transactionID: null,
                tr_tranNoteID: null,
                tr_transactionNotes: '',
                tr_createdBy: null,
                tr_createdOn: '',
                tr_editedOn:''
            }
        }
        function getNewTransactionDocuments(){
            return{
                tf_transactionID: '',
                tf_fileID:'',
                tf_file:'',
                tf_fileType:'',
                tf_fileName:''
            };
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
            };
            return $http(req);
        }

        function deleteTransactionFile(fileId){
            var req = {
                method: 'GET',
                url: appConfig.apiHost+'deleteTransactionFile?fileId='+fileId
            };
            return $http(req);
        }

        function getSingleTransactionSec(id){
            var req = {
                method: 'GET',
                url: appConfig.apiHost+'getSecondaryTransaction?id='+id
            };
            return $http(req);
        }

        function getAllTransactionFiles(transactionId){
            var req = {
                method: 'GET',
                url: appConfig.apiHost+'getTransactionFiles?transactionId='+transactionId
            };
            return $http(req);
        }

        function getSingleTransactionCommission(id){
            var req = {
                method: 'GET',
                url: appConfig.apiHost+'getCommissionTransaction?id='+id
            };
            return $http(req);
        }

        function getSingleTransactionNotes(transactionId){
            var req = {
                method: 'GET',
                url: appConfig.apiHost+'TransactionNotesList?transactionId='+transactionId
            };
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

        function downloadTransactionFile(fileID){
            return appConfig.apiHost+'downloadTransactionFile?fileID=' + fileID;
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

        function getCrudRequest(url,data, operation){
            data.operation = operation
            var req = {
                method:  'POST',//(operation === crud.READ) ? 'GET' : 'POST',
                url: appConfig.apiHost+url,
                headers: {
                    'Content-Type': "application/json"
                },
                data: {data: data}
            };
            console.log(req);

            return req;
        }

        function executeApiCall(requestObj, callBack){
            return $http(requestObj)
                .success(function (response) {
                    callback(response);
                });
        }


        function transactionBasicCrud(transactionBasic, operation, callBack){
            return $http(getCrudRequest('TransactionBasicCrud',transactionBasic, operation));
        }
        function transactionCommissionCrud(transactionCommission, operation, callBack){
            return $http(getCrudRequest('TransactionCommissionCrud',transactionCommission, operation));
        }
        function transactionShipmentCrud(transactionShipment, operation, callBack){
            return $http(getCrudRequest('TransactionShipmentCrud',transactionShipment, operation));
        }
        function transactionSecondaryCrud(transactionSecondary, operation, callBack){
            return $http(getCrudRequest('TransactionSecondaryCrud',transactionSecondary, operation));
        }
        function transactionStatusCrud(transactionStatus, operation, callBack){
            return $http(getCrudRequest('TransactionStatusCrud',transactionStatus, operation));
        }
        function transactionContractCrud(transactionContract, operation, callBack){
            return $http(getCrudRequest('TransactionContractCrud',transactionContract, operation));
        }
        function transactionDocumentCrud(transactionDocument, operation, callBack){
            return $http(getCrudRequest('TransactionDocumentCrud',transactionDocument, operation));
        }
        function transactionNotesCrud(transactionNotes, operation, callBack){
            return $http(getCrudRequest('TransactionNotesCrud',transactionNotes, operation));
        }


	}

}());
