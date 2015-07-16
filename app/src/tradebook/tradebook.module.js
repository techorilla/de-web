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
       views:{
            'content@shell':{
                templateUrl: 'src/tradebook/tradebook.template.html',
                controller: 'Tradebook as vm'
            }
        } 
     }).state('shell.tradebook.newTransaction',{
      url:'/new',
      views:{
        'content@shell':{
          templateUrl:'src/tradebook/addTransaction.html',
          controller:'AddTransaction as vm'
        }
      },
      resolve:{
          tradebook: 'tradebook',
          staticDropDown: function (tradebook) {
              return tradebook.getStaticDropDown().then(function (res) {
                  return res.data;
              });
          }
      }
    }).state('shell.tradebook.viewTransaction',{
            url:'/view/:id',
            views:{
                'content@shell':{
                    templateUrl:'src/tradebook/addTransaction.html',
                    controller:'AddTransaction as vm'
                }
            }
        });
  }

}());
