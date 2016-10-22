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
  function logs(dataService, $filter, appFormats){
		return {
            getAllUsersLogsOnDateRange: getAllUsersLogsOnDateRange,
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

		function getAllUsersLogsOnDateRange(startDate, endDate){
            var sDate = $filter('date')(new Date(startDate), appFormats.DBDate);
            var eDate = $filter('date')(new Date(endDate), appFormats.DBDate);
            return dataService.getRequest('getAllLogsInDateRange?startDate=' + sDate + '&endDate='+eDate,null);
		}

        function addNewUserLog(){

        }
	}

}());
