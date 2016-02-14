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
            addNewUser: addNewUser,
            originCrud: originCrud,
            getAllOrigin: getAllOrigin
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
        function getAllOrigin(){
            var req = {
                method: 'GET',
                url: appConfig.apiHost+'getAllOrigin'
            };
            return $http(req);
        }

        function originCrud(originName,originId,operation){
            var req = {
                method: 'POST',
                url: appConfig.apiHost+'originCRUD',
                headers: {
                    'Content-Type': "application/json"
                },
                data: {origin_id: originId, origin_name:originName, operation: operation}
            };
            return $http(req);
        }

		function getAllUsers(){
            var req = {
                method: 'GET',
                url: appConfig.apiHost+'getAppUsers'
            };
            return $http(req);
		}
        function addNewUser(newUser){
            var req = {
                method: 'POST',
                url: appConfig.apiHost+'addNewUser',
                headers: {
                    'Content-Type': "application/json"
                },
                data: {newUser: newUser}
            };
            return $http(req);
        }
        function getUserRights(){
            return $http.get('datastore/userRights.json');
        }
	}

}());
