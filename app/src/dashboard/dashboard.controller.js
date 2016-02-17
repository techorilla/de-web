/**
 * @ngdoc controller
 * @name app.dashboard.controller:Dashboard
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.dashboard')
		.controller('Dashboard', Dashboard);

  /* @ngInject */
	function Dashboard($timeout,dashboard){
		var vm = this;
        vm.tabs = [{
            title:'Bar Charts',
            chartConfig: dashboard.getBarChartsConfig('Bar Charts')
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
