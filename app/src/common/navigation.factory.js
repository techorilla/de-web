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
        var currentUser = {
            'name': 'Immad Imtiaz',
            'id': 1245
        };
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
            getYearsInDateRange: getYearsInDateRange
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
            console.log(currentYear);
            console.log(endYear);
            var years = [];
            while(currentYear <= endYear){
                years.push(currentYear);
                currentYear++;
            }
            return years;
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
