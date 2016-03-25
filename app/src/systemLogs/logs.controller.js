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
    function Logs(navigation){
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
        }

        function onDateRangeChanged(){

        }

        function testFunction(num){
            console.info('This is a test function');
        }
    }

}());
