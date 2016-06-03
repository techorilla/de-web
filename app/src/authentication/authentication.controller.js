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
    function Authentication(authentication,$state,localStorageService){
        var vm = this;

        vm.testFunction = testFunction;
        vm.invalidUserNamePass = false;
        vm.email = '';
        vm.pass = '';
        vm.hideLogin = false;
        vm.message = '';

        vm.login = function(){
            if(vm.signIn.$valid){
                authentication.userLogin(vm.email, vm.pass,function (response) {
                    if (response.success) {
                        authentication.SetCredentials(vm.email, vm.pass, response.userId);
                        var lastPage = localStorageService.get('lastState');
                        if(lastPage){
                            $state.go(lastPage.stateOnLogin,lastPage.stateParamsOnLogin);
                        }
                        else{
                            $state.go('shell.dashboard');
                        }

                    } else {
                        vm.message = response.message;
                        vm.hideLogin = true;
                        vm.invalidUserNamePass = true;
                    }
                });
            }
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
