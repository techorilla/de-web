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
	function Dashboard($scope,dashboard){
		var vm = this;
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
            vm.chartConfig = dashboard.getBarChartsConfig();
            $scope.$on('window.resize', function() {
            $timeout( function() {
                var element = document.getElementById("chart1");
                $compile(element)($scope)
            });
            vm.tabs = [{
                title:'Bar Charts'
            },{
                title:'Pie Charts'
            },{
                title:'Spline Charts'
            }];
        });



		}
	}

}());
