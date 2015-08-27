/**
 * @ngdoc overview
 * @name app
 * @description Glue to where all the greatness begins
 */

(function(){

  'use strict';

  angular.module('app', [
    'app.core',
    'app.common',
  /**
    * Application modules
  **/
    'app.shell',
    'app.product',
    'app.businessPartner',
    'app.widgets',
    'app.tradebook',
    'app.authentication',
    'app.dashboard',
    'app.setup'
  ]);

  angular.module('app').config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
  });
  

}());
