/**
 * @ngdoc controller
 * @name app.authentication.controller:Authentication
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.authentication')
		.controller('Authentication', Authentication);

  /* @ngInject */
	function Authentication($state, authService, $location){
		var vm = this;

		vm.testFunction = testFunction;
        vm.login = login;
        vm.hideLogin = false;
        vm.invalidUserNamePass = false;
        vm.message = '';
        vm.loginData = {
            userName: '',
            userPass: ''
        };

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.authentication.controller:Authentication
     * @description
     * My Description rules
     */
    function testFunction(num){

			
		}

    function login(){ 
            authService.login(vm.loginData).then(function (response) { 
            $location.path('/dashboard'); 
        },
         function (err) {
             vm.message = err.errorDescription;
         });
        }
	}

}());
