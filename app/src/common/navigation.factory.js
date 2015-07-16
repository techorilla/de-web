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
        var currentUser = {
            "name": "Immad Imtiaz",
            "id": 1245
        };
		return {
			testFunction: testFunction,
            invertSideBarState: invertSideBarState,
            sideBarStatus: sideBarStatus,
            getCurrentUser: getCurrentUser,
            getTime: getTime
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
