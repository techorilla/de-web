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
        'chart.js',
        'angular-loading-bar',
        'ngAnimate',
        'selectize',
        'ngTagsInput',
        'angularMoment',
        'toastr',
        'ngMessages',
        'ui.validate',
        'ngCookies',
        'pdf',
        'angularSpinner',
        'rzModule',
        'ngSanitize',
        'offClick',
        'ngSanitize',
        'ngCsv',
        'ngFileUpload',
        'textAngular',
        'LocalStorageModule',
        'ngIdle',
        'ngBootstrap',
        'ngFileSaver'
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
        .config(idleProviderConfig)
        .config(chartConfiguration);

    function idleProviderConfig(IdleProvider, KeepaliveProvider){
        IdleProvider.idle(1800); // in seconds
        IdleProvider.timeout(5); // in seconds
        KeepaliveProvider.interval(2); // in seconds
    }

    function chartConfiguration(ChartJsProvider){
        ChartJsProvider.setOptions(
            {scaleLabel: function(label){return label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}}
        );
        ChartJsProvider.setOptions(
            {multiTooltipTemplate: function(label) {
                return label.datasetLabel + ': ' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }}
        );
        ChartJsProvider.setOptions(
            {tooltipTemplate: function(label) {
                console.log(label);
                return label.label + ': ' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }}
        );
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
