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
	function NewUser(toastr, userRights,$scope, setup, $state){
		var vm = this;

		vm.testFunction = testFunction;
        vm.userRights = userRights;
        vm.titleConfig = {
            valueField: 'text',
            labelField: 'text',
            options: [
                { text: 'Mr' }, { text: 'Mrs' }, { text: 'Miss' }
            ],
            sortField: 'text',
            maxItems: 1
        };
        vm.newUser = {
            initials: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            reTypePassword: '',
            designation:'',
            isAdmin: false
        };
        vm.viewMode = false;
        vm.addNewUser = function(){
            if($scope.addNewUser.$valid) {
                setup.addNewUser(vm.newUser).then(
                    function(res){
                        if(res.data === 'AlreadyExist'){
                            toastr.error('User with this email already exist', 'Error');
                        }
                        else if(res.data === 'Saved'){
                            toastr.success('New app user Created', 'Success');
                            $state.go('shell.setup.allUsers');
                        }
                        else if(res.data === 'Error'){
                            toastr.error('User was not saved due to some error on server', 'Error');
                        }
                    }
                );
            }
            else{

            }

        }


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
