/**
 * @ngdoc service
 * @name app.common.navigation
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.common')
		.factory('navigation', navigation);

  /* @ngInject */
  function navigation(toastr, moment, appFormats){
        var isSideBarOpen = false;
        var months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct', 'Nov', 'Dec'
        ];

		return {
            invertSideBarState: invertSideBarState,
            sideBarStatus: sideBarStatus,
            chartColors: chartColors,
            getCurrentUser: getCurrentUser,
            getTime: getTime,
            internalServerError: internalServerError,
            successMessage: successMessage,
            initialDateRange: initialDateRange,
            getDateRangeArray: getDateRangeArray,
            getYearsInDateRange: getYearsInDateRange,
            getMonthsInDateRange: getMonthsInDateRange,
            getMonthTitle: getMonthTitle
		};

		////////////////////

    /**
     * @ngdoc
     * @name app.common.navigation#testFunction
     * @methodOf app.common.navigation
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * navigation.testFunction(id);
     * </pre>
     * @param {int} entity id
     */
        function getCurrentUser(){
            return currentUser;
        }
        function getTime(){
            return (new Date()).getTime();
        }
        function invertSideBarState(){
            isSideBarOpen = !isSideBarOpen;
        }
        function sideBarStatus(){
            return isSideBarOpen;
        }

        function chartColors(){
            return [
                '#F47414', // red
                '#1691ac', // blue
                '#333333', // light grey
                '#6d426d', // green
                '#FDB45C', // yellow
                '#949FB1', // grey
                '#4D5360'  // dark grey
            ];
        }

        function internalServerError(data,text){
            toastr.error(data,text);
        }



        function initialDateRange(){
            var datePicker = {};
            datePicker.startDate = moment().startOf('month');
            datePicker.endDate = moment().endOf('month');
            return datePicker;
        }

        function successMessage(msg,title){
            toastr.success(msg,title);
        }

        function getYearsInDateRange(startDate,endDate){
            var currentYear = parseInt(new Date(startDate).getFullYear());
            var endYear = parseInt(new Date(endDate).getFullYear());
            var years = [];
            while(currentYear <= endYear){
                years.push(currentYear);
                currentYear++;
            }
            return years;
        }

        function getMonthTitle(date){
            return months[date.getMonth()]+', '+date.getFullYear();
        }

        function getMonthsInDateRange(startDate,endDate){
            console.log(startDate);
            console.log(endDate);
            var sDate = new Date(startDate);
            var eDate = new Date(endDate);
            sDate = new Date( sDate.getFullYear()+'-'+sDate.getMonth());
            eDate = new Date( eDate.getFullYear()+'-'+eDate.getMonth());
            var monthList = [];
            while(sDate<=eDate){
                monthList.push(sDate);
                sDate = new Date(sDate.setMonth(sDate.getMonth()+1));
            }
            return monthList;
        }

        function getDateRangeArray(startDate, endDate){
            var dateArray = new Array();
            var currentDate = new Date(startDate);
            endDate = new Date (endDate);
            while (currentDate <= endDate) {
                dateArray.push(currentDate);
                currentDate = currentDate.addDays(1);
            }
            return dateArray;
        }
	}

}());
