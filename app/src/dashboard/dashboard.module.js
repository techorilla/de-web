/**
 * @ngdoc overview
 * @name app.dashboard
 * @description < description placeholder >
 */

(function(){

  'use strict';

  angular
    .module('app.dashboard', [])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider){

    
    $stateProvider
     .state('shell.dashboard', {
       url:'/dashboard',
       controller: 'Dashboard as vm',
       subNav: true,
       subNavTitle: 'Dashboard',
       subNavIndex: 0, 
       views:{
            'content@shell':{
                templateUrl: 'src/dashboard/dashboard.template.html', 
            }
        }      
     }
    );
  }

}());
