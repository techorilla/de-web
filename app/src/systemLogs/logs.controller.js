/**
 * @ngdoc controller
 * @name app.systemLogs.controller:Logs
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.systemLogs')
        .controller('Logs', Logs);

    /* @ngInject */
    function Logs(navigation, logs, appFormats){
        var vm = this;
        init();

        vm.testFunction = testFunction;

        /////////////////////

        /**
         * @ngdoc method
         * @name testFunction
         * @param {number} num number is the number of the number
         * @methodOf app.systemLogs.controller:Logs
         * @description
         * My Description rules
         */

        function init(){
            vm.dateRange = navigation.initialDateRange();
            vm.onDateRangeChanged = onDateRangeChanged;
            vm.allLogs = [];
            vm.timezone = (new Date()).getTimezoneOffset();
            vm.logsHeading = [];
            vm.getLogsExcelSheet = getLogsExcelSheet;
            onDateRangeChanged(vm.dateRange);
            vm.appFormat = appFormats

        }

        function onDateRangeChanged(dateRange){
            var startDate = new Date(dateRange.startDate);
            var endDate = new Date(dateRange.endDate);
            logs.getAllUsersLogsOnDateRange(startDate,endDate).then(function(res){

                if(res.data.success){
                    vm.allLogs = res.data.userLogs;
                }
            });
            console.log(vm.allLogs);
        }

        function getLogsExcelSheet(){

        }

        function testFunction(num){
            console.info('This is a test function');
        }
    }

}());
