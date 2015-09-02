/**
 * @ngdoc service
 * @name app.setup.setup
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.setup')
		.factory('setup', setup);

  /* @ngInject */
  function setup($http){
		return {
			getAllUsers: getAllUsers,
            getUserRights: getUserRights
		};

		////////////////////

    /**
     * @ngdoc
     * @name app.setup.setup#testFunction
     * @methodOf app.setup.setup
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * setup.testFunction(id);
     * </pre>
     * @param {int} entity id
     */

		function getAllUsers(){
            return $http.get('datastore/allUsers.json');
		}
        function getUserRights(){
            return $http.get('datastore/userRights.json');
        }
	}

}());
