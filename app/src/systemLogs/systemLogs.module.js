/**
 * @ngdoc overview
 * @name app.systemLogs
 * @description < description placeholder >
 */

(function(){

  'use strict';

  angular
    .module('app.systemLogs', [])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider){

    //add your state mappings here
      $stateProvider
          .state('shell.systemLogs', {
              url:'/systemLogs',
              views:{
                  'content@shell':{
                      templateUrl: 'src/systemLogs/systemLogs.template.html',
                      controller: 'Logs as vm'
                  }
              }
          }
      );
  }

}());
