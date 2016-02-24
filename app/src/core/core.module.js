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
    'selectize',
    'ngTagsInput',
    'angularMoment',
    'uiSwitch',
    'toastr',
    'ngMessages',
    'ui.validate',
    'ngCookies',
    'pdf',
    'fileSaver',
    'angularSpinner',
    'rzModule',
    'ngSanitize',
    'angular-click-outside',
    'ngSanitize',
    'ngCsv',
    'ngFileUpload',
    'textAngular',
    'LocalStorageModule',
    'highcharts-ng',
    'ngIdle',
    'daterangepicker',
    'ng.epoch',
    'n3-pie-chart'
  ]);

//  	angular.module('app.core').config(function (localStorageServiceProvider) {
//	  	localStorageServiceProvider
//	    .setPrefix('DoniGroup')
//	    .setStorageType('sessionStorage');
//	});

	angular.module('app.core')
    .config(scrollBarConfig)
    .config(localStorageConfig)
    .config(toastConfig)
    .config(idleProviderConfig);

    function idleProviderConfig(IdleProvider, KeepaliveProvider){
        IdleProvider.idle(300); // in seconds
        IdleProvider.timeout(5); // in seconds
        KeepaliveProvider.interval(2); // in seconds
    }


    function toastConfig(toastrConfig){
        angular.extend(toastrConfig, {
            autoDismiss: true,
            maxOpened: 1,
            toastClass: 'toastOpacity',
            closeButton: false
        });
    }


    function localStorageConfig (localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('DoniEnterprises');
    }

    function scrollBarConfig(ScrollBarsProvider){
        ScrollBarsProvider.defaults = {
            theme: 'dark',
            autoHideScrollbar: true,
            scrollbarPosition: 'inside',
            axis:'y',
            advanced:{
                updateOnContentResize: true
            }
        };
    }


}());
