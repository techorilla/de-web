/**
 * @ngdoc overview
 * @name app.setup
 * @description < description placeholder >
 */

(function(){

  'use strict';

  angular
    .module('app.setup', [])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider){

    //add your state mappings here
    $stateProvider
      .state('shell.setup', {
          url:'/setup',
          views:{
            'content@shell':{
                templateUrl: 'src/setup/setup.template.html',
                controller: 'Setup as vm'
            }
          }
        }
      ).
      state('shell.setup.newUser',{
        url:'/newUser',
        inSetup: 'true',
        inSetupTitle: 'New User',
        views:{
            'subContent@shell.setup':{
                templateUrl: 'src/setup/addNewUser.template.html'
            }
        }
      }).
      state('shell.setup.userRights',{
        url:'/userRights',
        inSetup: 'true',
        inSetupTitle: 'User Rights',
         views:{
             'subContent@shell.setup':{
                 templateUrl: 'src/setup/userRights.template.html'
             }
         }
      }).
      state('shell.setup.brokerBookSetup',{
        url:'/brokerBookSetup',
        inSetup: 'true',
        inSetupTitle: 'Broker Book Setup',
         views:{
             'subContent@shell.setup':{
                 templateUrl:'src/setup/brokerBookSetup.template.html'
             }
         }
      });
  }

}());
