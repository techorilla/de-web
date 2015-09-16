/**
 * @ngdoc overview
 * @name app.core
 * @description Configuration block for routing
 */

(function(){

  'use strict';

  angular.module('app.core')
    .config(configuration)
    .run(routingEvents);

  /* @ngInject */
  function configuration($urlRouterProvider){
    $urlRouterProvider.otherwise('/login');
  }

  /* @ngInject */
  function routingEvents($rootScope){
    //on routing error
    $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
      //do some logging and toasting
    });

    //on routing error
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      //do some title setting
      console.log(event);
      $rootScope.pageTitle = toState.title || 'Doni Enterprises';
      fromState.wentTo = toState.name;
      if(toState.wentTo !== fromState.name){
        toState.prevState = fromState.name;
        toState.prevParam = fromState.params;
      }
    });
  }

}());
