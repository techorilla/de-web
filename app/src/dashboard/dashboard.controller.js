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
	function Dashboard($scope){
		var vm = this;
        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data = [300, 500, 100];
//        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
//        $scope.series = ['Series A', 'Series B'];
//        $scope.data = [
//            [65, 59, 80, 81, 56, 55, 40],
//            [28, 48, 40, 19, 86, 27, 90]
//        ];
//        $scope.onClick = function (points, evt) {
//            console.log(points, evt);
//        };

		vm.testFunction = testFunction;

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.dashboard.controller:Dashboard
     * @description
     * My Description rules
     */
    function testFunction(num){

		}
	}

}());
