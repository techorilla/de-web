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
    function navigation(toastr, moment, appFormats, localStorageService, $filter){
        var isSideBarOpen = false;
        var months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct', 'Nov', 'Dec'
        ];

        var colors = [
            "#F47414", "#1691ac", "#333333", "#6d426d", "#FDB45C", "#949FB1",
            "#4D5360", "#3336AA", "#CC9678", "#F47267", "#169002", "#6d43F4",
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
            getWeekTitle: getWeekTitle,
            filterDate: filterDate,
            resetFormValidation: resetFormValidation,
            colors: colors,
            dashboardDateRange: dashboardDateRange
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

        function filterDate(datetime){
            return $filter('date')(datetime, appFormats.Date);
        }

        function invertSideBarState(flag){
            if(!flag){
                isSideBarOpen = !isSideBarOpen;
                localStorageService.set('sideBarStatus', {flag:isSideBarOpen});
            }
            else{
                if(isSideBarOpen){
                    isSideBarOpen = !isSideBarOpen;
                    localStorageService.set('sideBarStatus', {flag:isSideBarOpen});
                }
            }

        }
        function sideBarStatus(){
            var sideBarStatus = localStorageService.get('sideBarStatus');
            if(sideBarStatus){
                isSideBarOpen = sideBarStatus.flag;
            }
            else{
                localStorageService.set('sideBarStatus', {flag:isSideBarOpen});
            }
            return isSideBarOpen;
        }

        function chartColors(){
            return this.colors;
        }

        function internalServerError(data,text){
            toastr.error(data,text);
        }



        function initialDateRange(){
            var datePicker = {};
            datePicker.startDate = moment().subtract(14,'days').startOf('day');
            datePicker.endDate = moment().endOf('day');
            return datePicker;
        }

        function dashboardDateRange(){
            var datePicker = {};
            datePicker.startDate = moment().subtract(30,'days').startOf('day');
            datePicker.endDate = moment().add(14,'days').endOf('day');
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

        function resetFormValidation(formObj){
            for (var att in formObj.$error) {
                if (formObj.$error.hasOwnProperty(att)) {
                    formObj.$setValidity(att, true);
                }
            }
            formObj.$setPristine(true);
        }
    }

}());
