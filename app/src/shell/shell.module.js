/**
 * @ngdoc overview
 * @name app.shell
 * @description < description placeholder >
 */

(function(){

  'use strict';

  angular
    .module('app.shell', [])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider){

      $stateProvider
          .state('shell', {
              abstract: true,
              url:'',
              views: {
                  '@': {
                      templateUrl:'src/shell/shell.html',
                      controller: 'Shell as vm'
                  },
                  'topNavBar@shell': {
                      templateUrl: 'src/shell/topNavBar.html',
                      controller: 'TopNavBar as vm'
                  },
                  'subNavBar@shell': {
                      templateUrl: 'src/shell/subNavBar.html',
                      controller: 'SubNavBar as vm'
                  }
              }
          });
  }

}());
