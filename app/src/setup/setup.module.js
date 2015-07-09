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
                templateUrl: 'src/setup/setup.html'
            }
          }
        }
      ).
      state('shell.setup.newUser',{
        url:'/newUser',
        views:{
            'subContent@shell.setup':{
                templateUrl: 'src/setup/addNewUser.html'
            }
        }
      }).
      state('shell.setup.userRights',{
         url:'/userRights',
         views:{
             'subContent@shell.setup':{
                 templateUrl: 'src/setup/userRights.html'
             }
         }
      }).
      state('shell.setup.brokerBook',{
         url:'/brokerBook',
         views:{
             'subContent@shell.setup':{
                 templateUrl:''
             }
         }
      });
  }

}());
