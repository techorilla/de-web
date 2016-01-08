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
          country: function (tabFilter) {
              return tabFilter.getAllCountries().then(function (res) {
                  return res.data.country;
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
          completeTransaction: function(tradebook,crud,$stateParams){
              if($stateParams.tran === 'new'){
                  return null
              }
              else{
                  return tradebook.transactionBasicCrud(tradebook.getNewTransaction($stateParams.tran),crud.READ).then(
                      function(response){
                          if(response.success){
                              return response;
                          }
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
              templateUrl:'src/tradebook/transactionCommission/transactionCommission.html'
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
          }
       }
    });
  }

}());
