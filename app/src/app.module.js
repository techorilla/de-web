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
    'app.welcome',
    'app.shell',
    'app.product',
    'app.businessPartner',
    'app.transaction',
    'app.widgets'
  ]);

}());
