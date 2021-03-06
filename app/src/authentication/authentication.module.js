/**
 * @ngdoc overview
 * @name app.authentication
 * @description < description placeholder >
 */

(function(){

  'use strict';

  angular
    .module('app.authentication', [])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider){

    $stateProvider
      .state('login', {
        url:'/login',
        templateUrl:'src/authentication/login.html',
        controller: 'Authentication as vm',
        bodyBackground: {'background': 'url(/images/welcome/login_page.jpg) no-repeat', 'background-size': 'cover'}
      }
    );
  }

}());
