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
            getWeeksInDateRange: getWeeksInDateRange,
            getMonthTitle: getMonthTitle,
            getWeekTitle: getWeekTitle
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

        function getWeeksInDateRange(startDate,endDate){
            var sDate = new Date(startDate);
            var eDate = new Date(endDate);
            sDate = new Date( sDate.getFullYear()+'-'+ (sDate.getMonth()+1)+'-'+sDate.getDate());
            eDate = new Date( eDate.getFullYear()+'-'+(eDate.getMonth()+1)+'-'+eDate.getDate());
            var weekList = [];
            while(sDate<eDate){
                var temp = new Date(sDate);
                weekList.push(temp);
                var dayToAdd = (sDate.getDay() === 0) ? 7 : sDate.getDay()+1;
                sDate.setDate(sDate.getDate()+dayToAdd);
            }
            weekList.push(eDate);
            return weekList;

        }

        function getWeekTitle(weekStart, weekEnd){
            return  weekStart.getDate()+' '+months[weekStart.getMonth()]+', '+weekStart.getFullYear() + ' - '+ weekEnd.getDate()+' '+months[weekEnd.getMonth()]+', '+weekEnd.getFullYear();
        }



        function getMonthsInDateRange(startDate,endDate){
            var sDate = new Date(startDate);
            var eDate = new Date(endDate);
            sDate = new Date( sDate.getFullYear()+'-'+ (sDate.getMonth()+1));
            eDate = new Date( eDate.getFullYear()+'-'+(eDate.getMonth()+1));
            var monthList = [];
            if(sDate.toString() === eDate.toString()){
                var temp = new Date(sDate);
                monthList.push(temp);
                eDate = new Date(sDate.setMonth(sDate.getMonth()+1));
                monthList.push(eDate);
            }
            else{
                while(sDate<=eDate){
                    var temp = new Date(sDate);
                    monthList.push(temp);
                    sDate = new Date(sDate.setMonth(sDate.getMonth()+1));
                }
                sDate = new Date(sDate.setMonth(sDate.getMonth()+1));
                monthList.push(sDate);
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
