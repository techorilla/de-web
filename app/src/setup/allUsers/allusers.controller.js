/**
 * @ngdoc controller
 * @name app.setup.controller:AllUsers
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.setup')
		.controller('AllUsers', AllUsers);

  /* @ngInject */
	function AllUsers(allUsers){
		var vm = this;
        vm.allUsers = {};
        vm.allUsers.users = allUsers;
        vm.allUsers.heading = [
            "User Name", "Designation", "E-mail", "Last Active", "Created By"
        ]
		vm.testFunction = testFunction;
        vm.searchUser = '';
        vm.viewMode = false;
        console.log(vm.allUsers);

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.setup.controller:AllUsers
     * @description
     * My Description rules
     */
    function testFunction(num){
			console.info('This is a test function');
		}
	}

}());
