/**
 * @ngdoc overview
 * @name app.businessPartner
 * @description < description placeholder >
 */

(function(){

  'use strict';

  angular
    .module('app.businessPartner', [])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider){
    $stateProvider
     .state('shell.businessPartner', {
       url:'/businessPartner',
       subNav: true,
       subNavTitle: 'Business Partner', 
       views:{
            'content@shell':{
                templateUrl: 'src/businessPartner/businessPartner.template.html',
                controller: 'BusinessPartner as vm' 
            }
        } 
     }
    ).state('shell.businessPartner.addBusinessPartner',{
      url:'/add',
      resolve:{
          tabFilter: 'tabFilter',
          country: function(tabFilter){
              return tabFilter.getAllCountries().then(function(res){
                  return res.data.country;
              });
          },
          bpTypes: function(tabFilter){
              return tabFilter.getBusinessPartnerTypes().then(function(res){
                  return res.data.bpTypes;
              });
          },
          contractTypes: function(tabFilter){
              return tabFilter.getBuyerContractTypes().then(function(res){
                 return res.data.contractTypes;
              });
          }
      },
      views:{
            'content@shell':{
              templateUrl:'src/businessPartner/addBusinessPartner/addBusinessPartner.html',
              controller: 'AddBusinessPartner as vm'
            } 
      }
    })
    .state('shell.businessPartner.view',{
        url:'/view/:id',
        resolve:{

        },
        views:{
            'content@shell':{
                templateUrl: 'src/businessPartner/businessPartnerInfo.html',
                controller: 'BusinessPartnerInfo as vm'
            }
        }
      });
  }

}());
