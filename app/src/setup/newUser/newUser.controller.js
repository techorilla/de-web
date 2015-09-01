/**
 * @ngdoc controller
 * @name app.setup/newUser.controller:NewUser
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.setup')
		.controller('NewUser', NewUser);

  /* @ngInject */
	function NewUser(toastr){
		var vm = this;
        toastr.success('Hello world!', 'Toastr fun!');
		vm.testFunction = testFunction;
        vm.newUser = {
            initials: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            reTypePassword: ''
        };
        vm.viewMode = false;

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.setup/newUser.controller:NewUser
     * @description
     * My Description rules
     */
    function testFunction(num){
			console.info('This is a test function');
		}
	}

}());
