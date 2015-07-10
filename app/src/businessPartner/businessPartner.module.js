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
      views:{
            'content@shell':{
              templateUrl:'src/businessPartner/addBusinessPartner.html',
              controller: 'AddBusinessPartner as vm'
            } 
      }
    });
  }

}());
