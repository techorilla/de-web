/**
 * @ngdoc service
 * @name app.authentication.authSerivce
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.authentication')
		.factory('authService', authService);

  /* @ngInject */
  function authService($http, $q, localStorageService, $state){
        var serviceBase = 'http://localhost:43158/api/';
        var _authentication = {
            isAuth:false,
            userName:''
        };
		return {
            login: login,
            logOut: logOut
		};

		////////////////////

    /**
     * @ngdoc
     * @name app.authentication.authSerivce#testFunction
     * @methodOf app.authentication.authSerivce
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * authSerivce.testFunction(id);
     * </pre>
     * @param {int} entity id
     */
        function login(loginData){

            var data = 'grant_type=password&username=' + loginData.userName + '&password=' + loginData.userPass;
 
            var deferred = $q.defer();
     
            $http.post(serviceBase + 'authentication/login/', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
     
                localStorageService.set('authorizationData', { token: response.accessToken, userName: loginData.userName });
     
                _authentication.isAuth = true;
                _authentication.userName = loginData.userName;
     
                deferred.resolve(response);
     
            }).error(function (err, status) {
                logOut();
                deferred.reject(err);
            });
     
        return deferred.promise;
        }
        function logOut(){
            localStorageService.remove('authorizationData');
            _authentication.isAuth = false;
            _authentication.userName = '';
        }
	}

}());
