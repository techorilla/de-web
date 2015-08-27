/**
 * @ngdoc service
 * @name app.common.authInterceptorService
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.common')
		.factory('authInterceptorService', authInterceptorService);

  /* @ngInject */
  function authInterceptorService($q, $location, localStorageService){

      var request = function (config) {
          config.headers = config.headers || {};
          var authData = localStorageService.get('authorizationData');
          if (authData) {
              config.headers.Authorization = 'Bearer ' + authData.token;
          }
          return config;
      };

      var responseError = function (rejection) {
          if (rejection.status === 401) {
              $location.path('/login');
          }
          return $q.reject(rejection);
      };
	  return {
            request: request,
            responseError: responseError
	  };

		////////////////////

    /**
     * @ngdoc
     * @name app.common.authInterceptorService#testFunction
     * @methodOf app.common.authInterceptorService
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * authInterceptorService.testFunction(id);
     * </pre>
     * @param {int} entity id
     */

  }

}());
    