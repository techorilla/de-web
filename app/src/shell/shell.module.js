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
                      templateUrl:'src/shell/shell.html'
                  },
                  'topNavBar@shell': {
                      templateUrl: 'src/shell/topNavBar.html'
                  },
                  'subNavBar@shell': {
                      templateUrl: 'src/shell/subNavBar.html'
                  }
              }
          });
  }

}());
