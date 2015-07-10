/**
 * @ngdoc overview
 * @name app.core
 * @description Core is where the Magma is
 */

(function(){

  'use strict';

  angular.module('app.core', [
    'ui.router',
    'restangular',
    'FBAngular',
    'ngScrollbars',
    'ui.bootstrap',
    'smart-table',
    'angular-loading-bar', 
    'ngAnimate',
    'LocalStorageModule',
    'selectize'
  ]);

  	angular.module('app.core').config(function (localStorageServiceProvider) {
	  	localStorageServiceProvider
	    .setPrefix('DoniGroup')
	    .setStorageType('sessionStorage');
	});

	angular.module('app.core').config(function (ScrollBarsProvider) {
	    ScrollBarsProvider.defaults = {
	        theme: 'dark',
	        autoHideScrollbar: true,
            scrollbarPosition: 'inside',
            axis:'y'
	    };
	});

}());
