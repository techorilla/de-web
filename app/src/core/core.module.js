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
    'selectize',
    'ngTagsInput',
    'angularMoment',
    'uiSwitch',
    'toastr',
    'ngMessages',
    'ui.validate',
    'ngCookies'
  ]);

//  	angular.module('app.core').config(function (localStorageServiceProvider) {
//	  	localStorageServiceProvider
//	    .setPrefix('DoniGroup')
//	    .setStorageType('sessionStorage');
//	});

	angular.module('app.core').config(function (ScrollBarsProvider) {
	    ScrollBarsProvider.defaults = {
	        theme: 'dark',
	        autoHideScrollbar: true,
            scrollbarPosition: 'inside',
            axis:'y'
	    };
	});

    angular.module('app.core').config(function($httpProvider) {
        $httpProvider.interceptors.push(function($q, $injector) {
            return {
                'responseError': function(rejection){
                    var defer = $q.defer();
                    console.log(rejection);
                    if(rejection.status == 401){
                        $injector.get('$state').transitionTo('login');;
                    }
                    defer.reject(rejection);
                    return defer.promise;
                }
            };
        });

    });

}());
