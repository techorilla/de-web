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
    'app.dashboard',
    'app.setup',
    'app.authentication',
    'app.modal',
    'app.analytics',
    'app.systemLogs'
    ]);

    angular.module('app').config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

    }]);

}());
