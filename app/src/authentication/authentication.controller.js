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
	function Authentication(authentication,$state){
		var vm = this;

		vm.testFunction = testFunction;
        vm.invalidUserNamePass = false;
        vm.email = '';
        vm.pass = '';
        vm.hideLogin = false;
        vm.message = '';
        vm.login = function(){
            authentication.userLogin(vm.email, vm.pass).then(function(res){
                console.log('back');
                if(res.data === 'Successful Login'){
                    $state.go('shell.dashboard');
                }
                else{
                    vm.hideLogin = true;
                    vm.message = res.data;
                    vm.invalidUserNamePass  = true;
                }
            });
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
			console.info('This is a test function');
		}
	}

}());
