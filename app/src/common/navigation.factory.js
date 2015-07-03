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
  function navigation(){
        var isSideBarOpen = true;
		return {
			testFunction: testFunction,
            invertSideBarState: invertSideBarState,
            sideBarStatus: sideBarStatus
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

		function testFunction(id){
			console.info('This is a test function');
		}
        function invertSideBarState(){
            isSideBarOpen = !isSideBarOpen;
        }
        function sideBarStatus(){
            return isSideBarOpen;
        }
	}

}());
