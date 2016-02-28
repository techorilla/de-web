/**
 * @ngdoc controller
 * @name app.analytics.controller:Analytics
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.analytics')
		.controller('Analytics', Analytics);

  /* @ngInject */
	function Analytics(dashboard,navigation,$timeout){
        var vm = this;
        vm.dateRange = navigation.initialDateRange();
        vm.tabs = [{
            title:'Bar Charts',
            chartConfig: dashboard.getBarChartsConfig('Bar Charts'),
            options: {thickness: 10},
            data : [
                {label: "one", value: 12.2, color: "red"},
                {label: "two", value: 45, color: "#00ff00"},
                {label: "three", value: 10, color: "rgb(0, 0, 255)"}
            ]
        },{
            title:'Pie Charts',
            chartConfig: dashboard.getPieChartConfig('Pie Charts')
        },{
            title:'Spline Charts'
        }];
        init();

        /////////////////////

        /**
         * @ngdoc method
         * @name testFunction
         * @param {number} num number is the number of the number
         * @methodOf app.dashboard.controller:Dashboard
         * @description
         * My Description rules
         */
        function init(){
            $timeout(function(){
                vm.chartShow  = true;
            },0);
        }
	}

}());
