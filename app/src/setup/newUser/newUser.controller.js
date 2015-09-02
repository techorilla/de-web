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
	function NewUser(toastr, userRights){
		var vm = this;
        toastr.success('Hello world!', 'Toastr fun!');
		vm.testFunction = testFunction;
        vm.userRights = userRights;
        vm.newUser = {
            initials: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            reTypePassword: '',
            isAdmin: true
        };
        vm.viewMode = false;
        vm.titleConfig = {
            valueField: 'text',
            labelField: 'text',
            options: [
                { text: 'Mr' }, { text: 'Mrs' }, { text: 'Miss' }
            ],
            sortField: 'text',
            maxItems: 1
        };

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
