/**
 * @ngdoc service
 * @name app.authentication.authentication
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.authentication')
		.factory('authentication', authentication);

  /* @ngInject */
  function authentication(appConfig, $http){
		return {
			testFunction: testFunction,
            userLogin: userLogin
		};

		////////////////////

    /**
     * @ngdoc
     * @name app.authentication.authentication#testFunction
     * @methodOf app.authentication.authentication
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * authentication.testFunction(id);
     * </pre>
     * @param {int} entity id
     */
        function userLogin(email, pass){
            return $http.post(appConfig.apiHost+'/login?email='+email+'&password='+pass);
        }
		function testFunction(id){
			console.info('This is a test function');
		}
	}

}());
