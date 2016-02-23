/**
 * @ngdoc controller
 * @name app.setup.controller:ChangePassword
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.setup')
		.controller('ChangePassword', ChangePassword);

  /* @ngInject */
	function ChangePassword(setup, inputFields, $state, toastr){
		var vm = this;
        init();

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.setup.controller:ChangePassword
     * @description
     * My Description rules
     */
        function init(){
            vm.passwordDetails = setup.getChangePasswordObject();
            vm.submitChangePassword = submitChangePassword;
            vm.inputFields = inputFields;
        }

        function submitChangePassword(form){
            if(form.$valid){
                setup.submitChangePassword(vm.passwordDetails).then(function(res){
                   if(res.data.success){
                       $state.go('shell.setup');
                   }
                });
            }
        }
	}

}());
