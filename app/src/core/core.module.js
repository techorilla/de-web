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
	        scrollButtons: {
	            enable: false // enable scrolling buttons by default 
	        },
	        axis: 'y', // enable 2 axis scrollbars by default, 
	 
	        // the following settings are defined for all scrollbars unless the 
	        // scrollbar has local scope configuration 
	        theme: 'dark',
	        autoHideScrollbar: true,
	    };
	});

}());
