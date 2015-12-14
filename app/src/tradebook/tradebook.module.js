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
     .state('shell.tradebook.viewTransaction',{
       url:'/view/:id',
       subNavTitle: 'Trade Book - View Transaction',
       views:
       {
            'content@shell':{
                templateUrl: 'src/tradebook/viewTransaction/viewtransaction.template.html',
                controller: 'ViewTransaction as vm'
            },
            'notes@shell.tradebook.viewTransaction':{
                templateUrl: 'src/tradebook/viewTransaction/transactionnotes.template.html',
                controller: 'TransactionNotes as vm'
            },
            'documents@shell.tradebook.viewTransaction':{
                templateUrl: 'src/tradebook/viewTransaction/transactiondocuments.template.html',
                controller: 'TransactionDocuments as vm'
            }
       }
     })
     .state('shell.tradebook.newTransaction',{
       url:'/new',
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
          }
       },
       views:{
          'content@shell':{
              templateUrl:'src/tradebook/addTransaction.html',
              controller:'AddTransaction as vm'
          }
       }
    });
  }

}());
