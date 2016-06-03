/**
 * @ngdoc service
 * @name app.systemLogs.logs
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.systemLogs')
		.factory('logs', logs);

  /* @ngInject */
  function logs(dataService){
		return {
            getAllUsersLogs: getAllUsersLogs,
            addNewUserLog: addNewUserLog
		};

		////////////////////

    /**
     * @ngdoc
     * @name app.systemLogs.logs#testFunction
     * @methodOf app.systemLogs.logs
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * logs.testFunction(id);
     * </pre>
     * @param {int} entity id
     */

		function getAllUsersLogs(){

		}

        function addNewUserLog(){

        }
	}

}());
