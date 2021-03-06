/**
 * @ngdoc overview
 * @name app.tradebook
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.tradebook', [])
        .config(configuration);

    /* @ngInject */
    function configuration($stateProvider){

        $stateProvider
            .state('shell.tradebook', {
                url:'/tradebook',
                subNav: true,
                subNavTitle: 'Trade Book',
                views:
                {
                    'content@shell':{
                        templateUrl: 'src/tradebook/tradebook.template.html',
                        controller: 'Tradebook as vm'
                    }
                }
            })
            .state('shell.tradebook.Transaction',{
                url:'/:tran',
                resolve:{
                    staticDropDown: function (tradebook) {
                        return tradebook.getStaticDropDown().then(function (res) {
                            return res.data;
                        });
                    },
                    filterFromDb: function(tabFilter){
                        return tabFilter.filterFromDb().then(function(res){
                            return res.data;
                        });
                    },
                    originConfig: function (tabFilter) {
                        return tabFilter.getAllCountries().then(function (res) {
                            return tabFilter.getOriginConfig(res.data.origins);
                        });
                    },
                    sellersList: function(tabFilter){
                        return tabFilter.getDropDownBP("Seller").then(function(res){
                            return res.data.data;
                        });
                    },
                    shippersList: function(tabFilter) {
                        return tabFilter.getDropDownBP("Shipper").then(function (res) {
                            return res.data.data;
                        });
                    },
                    buyersList: function(tabFilter) {
                        return tabFilter.getDropDownBP("Buyer").then(function (res) {
                            return res.data.data;
                        });
                    },
                    bpConfig: function(tradebook){
                        return tradebook.getBpConfig();
                    },
                    brokersList: function(tabFilter){
                        return tabFilter.getDropDownBP("Broker").then(function(res){
                            return res.data.data;
                        });
                    },
                    completeTransaction: function(tradebook,crud,$stateParams){
                        if($stateParams.tran === 'new'){
                            return null
                        }
                        else{
                            return tradebook.getSingleTransactionDetails($stateParams.tran).then(
                                function(response){
                                    return response.data;
                                }
                            );
                        }
                    }
                },
                views:{
                    'content@shell':{
                        templateUrl:'src/tradebook/addTransaction/addTransaction.html',
                        controller:'AddTransaction as vm'
                    },
                    'commission@shell.tradebook.Transaction':{
                        templateUrl:'src/tradebook/transactionCommission/transactionCommission.html',
                        controller: 'TransactionCommission as vm'
                    },
                    'documents@shell.tradebook.Transaction':{
                        templateUrl:'src/tradebook/transactionNotes/transactionNotes.html',
                        controller:'TransactionNotes as vm'
                    },
                    'notes@shell.tradebook.Transaction':{
                        templateUrl:'src/tradebook/transactionDocuments/transactionDocuments.html',
                        controller:'TransactionDocuments as vm'
                    },
                    'shipmentDetails@shell.tradebook.Transaction':{
                        templateUrl: 'src/tradebook/shipmentDetails/shipmentDetails.html',
                        controller: 'ShipmentDetails as vm'
                    },
                    'secondaryTransaction@shell.tradebook.Transaction':{
                        templateUrl:'src/tradebook/secondaryTrade/secondaryTrade.html',
                        controller:'SecondaryTrade as vm'
                    },
                    'contractInfo@shell.tradebook.Transaction':{
                        templateUrl: 'src/tradebook/transactionContract/transactionContract.html',
                        controller: 'TransactionContract as vm'
                    },
                    'status@shell.tradebook.Transaction':{
                        templateUrl:'src/tradebook/transactionStatus/transactionStatus.html',
                        controller:'TransactionStatus as vm'
                    }
                }
            });
    }

}());
