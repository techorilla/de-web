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
    function tradebook($http,appConfig,dataService , $filter, appFormats, FileSaver, Blob){
        var bpConfig = {
            plugins: {
                'no-delete': {}
            },
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
        var transactionBasic = {};
        return {

            setTransactionBasic: setTransactionBasic,
            getTransactionBasic: getTransactionBasic,
            saveBasicTransaction: saveBasicTransaction,
            getTransactionList: getTransactionList,
            getTransactionListOnDateRange: getTransactionListOnDateRange,
            getTransactionByParameter:getTransactionByParameter,
            getStaticDropDown: getStaticDropDown,
            addNewTransaction: addNewTransaction,

            getSingleTransactionDetails: getSingleTransactionDetails,
            getSingleTransactionSec: getSingleTransactionSec,
            getSingleTransactionCommission: getSingleTransactionCommission,
            getSingleTransactionNotes: getSingleTransactionNotes,
            getSingleTransactionShipment: getSingleTransactionShipment,
            getSingleTransactionStatus: getSingleTransactionStatus,
            getSingleTransactionContract: getSingleTransactionContract,

            getProductConfig: getProductConfig,
            getAllTransactionFiles: getAllTransactionFiles,
            getBpConfig: getBpConfig,
            getCommissionTypeConfig: getCommissionTypeConfig,
            getTransactionStatusConfig: getTransactionStatusConfig,
            getTimeDrillConfig: getTimeDrillConfig,

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
            transactionDocumentCrud: transactionDocumentCrud,
            calculateCommission: calculateCommission

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
        function setTransactionBasic(transaction){
            this.transactionBasic = transaction;
        }

        function getTransactionBasic(){
            return this.transactionBasic;
        }

        function calculateCommission(commissionDetails,transactionBasic){
            var type = commissionDetails.tr_ownCommissionType;
            var price = transactionBasic.tr_price;
            var quantity = transactionBasic.tr_quantity;
            var comm =  commissionDetails.tr_own_Commission;
            var commIntoPrice = 0;
            var brokerCommType = commissionDetails.tr_buyerBroker_comm_type;
            var brokerIntoPrice = 0;
            var bComm = commissionDetails.tr_buyerBroker_comm;
            if(type !== ''){
                commIntoPrice = (type === 'Fixed') ? (comm) : (comm*0.01)*price;
            }
            if(brokerCommType!==''){
                brokerIntoPrice = (brokerCommType==='Fixed') ? bComm : (bComm*0.01)*price;
            }
            var tr_netCommission = (((commIntoPrice - brokerIntoPrice) + commissionDetails.tr_difference )- commissionDetails.tr_discount);

            commissionDetails.tr_netCommission = tr_netCommission * quantity;
        }


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
                tr_contractID:null,
                tr_other_info:null
            };

        }

        function testFunction(id){

        }
        function getProductConfig(){
            return {
                plugins: {
                    'no-delete': {}
                },
                valueField: 'id',
                sortField: 'name',
                searchField: ['name','origin', 'quality'],
                maxItems:1,
                create: false,
                persist: false,
                render: {
                    item: function(item, escape) {
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
                tr_sec_otherInfo:'',
                tr_sec_quantity: null
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
                tr_buyerBroker_comm: 0.00,
                tr_own_Commission:0.00,
                tr_ownCommissionType:'Fixed',
                tr_difference:0.00,
                tr_discount:0.00,
                tr_netCommission:0.00
            };
        }

        function getNewTransactionStatus(id){
            return {
                tr_transactionID:id,
                tr_transactionStatus:'',
                tr_washoutValueAtPar: null
            };
        }

        function getNewTransactionContract(id){
            return {
                tr_transactionID:id,
                tr_doniContract:false,
                tr_ownContract:false,
                tr_ContractualBuyer:null
            };
        }

        function getCommissionTypeConfig(commissionTypes){
            return {
                plugins: {
                    'no-delete': {}
                },
                options: commissionTypes,
                create: true,
                sortField: 'text',
                valueField: 'text',
                labelField: 'text',
                maxItems:1
            };
        }

        function getTimeDrillConfig(timeDrillOptions){
            return {
                plugins: {
                    'no-delete': {}
                },
                options: timeDrillOptions,
                create: true,
                sortField: 'order',
                valueField: 'value',
                labelField: 'text',
                maxItems:1
            }
        }

        function getTransactionStatusConfig(transactionStatus){
            return {
                plugins: {
                    'no-delete': {}
                },
                options: transactionStatus,
                create: true,
                sortField: 'value',
                valueField: 'text',
                labelField: 'text',
                maxItems:1
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




        function getNewShipmentDetails(id){
            return {
                tr_transactionID: id,
                tr_ship_notShipped:false,
                tr_ship_notShipped_reason:null,
                tr_ship_extension:null,
                tr_ship_appReceived:false,
                tr_expectedShipment:null,
                tr_inTransit:null,
                tr_shipped:false,
                tr_dateShipped:null,
                tr_expectedArrival:null,
                tr_transitPort:null,
                tr_ship_arrivedAtPort:false,
                tr_dateArrived:null,
                tr_actualArrived:null,
                tr_ship_BlNo:null,
                tr_ship_invoiceNo:null,
                tr_ship_invoiceAmt:null,
                tr_ship_quantity:null,
                tr_ship_vesselNo:null,
                tr_ship_primaryShipperId:null,
                tr_ship_portLoad:null,
                tr_ship_portDest:null,
                tr_ship_shipLineCont:null,
                tr_ship_chk_reason:false,
                tr_ship_chk_shpExt:false,
                tr_ship_chk_expShp:false,
                tr_ship_chk_inTransit:false,
                tr_ship_chk_dateShipped:false,
                tr_ship_chk_expArrival:false,
                tr_ship_chk_transitPort:false,
                tr_ship_chk_dateArrived:false,
                tr_ship_chk_actualArrived:false
            };
        }

        function getSingleTransactionDetails(id){
            return dataService.getRequest('getSingleTransaction?id='+id);
        }

        function deleteTransactionFile(fileId){
            return dataService.getRequest('deleteTransactionFile?fileId='+fileId);
        }

        function getSingleTransactionSec(id){
            return dataService.getRequest('getSecondaryTransaction?id='+id);
        }

        function getSingleTransactionShipment(id){
            return dataService.getRequest('getTransactionShipment?transactionId='+id);
        }

        function getSingleTransactionStatus(id){
            return dataService.getRequest('getTransactionStatus?transactionId='+id);
        }

        function getSingleTransactionContract(id){
            return dataService.getRequest('getTransactionContract?transactionId='+id);
        }

        function getAllTransactionFiles(transactionId){
            return dataService.getRequest('getTransactionFiles?transactionId='+transactionId);
        }

        function getSingleTransactionCommission(id){
            return dataService.getRequest('getCommissionTransaction?id='+id);
        }

        function getSingleTransactionNotes(transactionId){
            return dataService.getRequest('TransactionNotesList?transactionId='+transactionId);
        }

        function getTransactionByParameter(parameter, textInput, dateInput){
            return dataService.getRequest('TransactionGetByParameter?parameter='+parameter+'&textInput='+textInput+'&dateInput='+dateInput);
        }

        function addNewTransaction(transaction,callback){
            return dataService.postRequest(
                'addNewTransaction',
                {transaction: transaction},
                callback
            );
        }

        function downloadTransactionFile(fileID,fileName,fileType){
            return dataService.downloadFile('getTransactionFile?fileID=' + fileID).then(function(res, status, header){
                var data = new Blob( [res.data], { type: fileType });
                FileSaver.saveAs(data, fileName);

            });
        }

        function saveBasicTransaction(newTransaction, callback){
            return dataService.postRequest(
                'addNewTransaction/basic',
                {newTransaction: newTransaction},
                callback
            );
        }

        function getTransactionList(){
            return dataService.getRequest('getTransactionTable');
        }
        function getStaticDropDown(){
            return $http.get('datastore/addTransactionBasicFilters.json');
        }

        function getTransactionListOnDateRange(startDate,endDate){
            var sDate = $filter('date')(new Date(startDate), appFormats.DBDate);
            var eDate = $filter('date')(new Date(endDate), appFormats.DBDate);
            return dataService.getRequest('getTransactionTableOnDateRange?startDate=' + sDate + '&endDate='+eDate,null);
        }

        function transactionBasicCrud(transactionBasic, operation, callBack){
            return dataService.getCrudRequest('TransactionBasicCrud',transactionBasic, operation, callBack);
        }
        function transactionCommissionCrud(transactionCommission, operation, callBack){
            return dataService.getCrudRequest('TransactionCommissionCrud',transactionCommission, operation, callBack);
        }
        function transactionShipmentCrud(transactionShipment, operation, callBack){
            return dataService.getCrudRequest('TransactionShipmentCRUD',transactionShipment, operation, callBack);
        }
        function transactionSecondaryCrud(transactionSecondary, operation, callBack){
            return dataService.getCrudRequest('TransactionSecondaryCrud',transactionSecondary, operation, callBack);
        }
        function transactionStatusCrud(transactionStatus, operation, callBack){
            return dataService.getCrudRequest('TransactionStatusCrud',transactionStatus, operation, callBack);
        }
        function transactionContractCrud(transactionContract, operation, callBack){
            return dataService.getCrudRequest('TransactionContractCrud',transactionContract, operation, callBack);
        }
        function transactionDocumentCrud(transactionDocument, operation, callBack){
            return dataService.getCrudRequest('TransactionDocumentCrud',transactionDocument, operation, callBack);
        }
        function transactionNotesCrud(transactionNotes, operation, callBack){
            return dataService.getCrudRequest('TransactionNotesCrud',transactionNotes, operation, callBack);
        }


    }

}());
