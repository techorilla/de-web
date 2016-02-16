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
    'highcharts-ng'
  ]);

//  	angular.module('app.core').config(function (localStorageServiceProvider) {
//	  	localStorageServiceProvider
//	    .setPrefix('DoniGroup')
//	    .setStorageType('sessionStorage');
//	});

	angular.module('app.core')
    .config(function (ScrollBarsProvider) {
        ScrollBarsProvider.defaults = {
            theme: 'dark',
            autoHideScrollbar: true,
            scrollbarPosition: 'inside',
            axis:'y',
            advanced:{
                updateOnContentResize: true
            }
        };
    })
    .config(function(toastrConfig) {
        angular.extend(toastrConfig, {
            autoDismiss: true,
            maxOpened: 1,
            toastClass: 'toastOpacity',
            closeButton: false
        });
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
    angular.module('app.core').config(function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('DoniEnterprises');
    });
    angular.module('app.core').run(
        function ($rootScope, $location, $cookies,$cookieStore, $http) {
            // keep user logged in after page refresh
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
                $http.defaults.headers.common.userId = $rootScope.globals.currentUser.userId;
            }

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirect to login page if not logged in
                if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                    $location.path('/login');
                }
            });
    });

}());
