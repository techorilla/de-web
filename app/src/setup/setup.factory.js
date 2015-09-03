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
  function setup($http, appConfig){
		return {
			getAllUsers: getAllUsers,
            getUserRights: getUserRights,
            addNewUser: addNewUser
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
        function addNewUser(user){
            return $http.post(appConfig.apiHost+ 'addNewUser?title='+user.initials+'&fname='+user.firstName+'&lname='+user.lastName+'&des='+user.designation+'&email='+user.email+'&pass='+user.password+'&isAdmin='+user.isAdmin);
        }
        function getUserRights(){
            return $http.get('datastore/userRights.json');
        }
	}

}());
