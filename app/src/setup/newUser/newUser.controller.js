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
    function NewUser(toastr,$scope, setup, $state, $stateParams,allUsers, modalFactory){
        var vm = this;
        init();



        function init(){

            vm.titleConfig = {
                valueField: 'text',
                labelField: 'text',
                options: [
                    { text: 'Mr' }, { text: 'Mrs' }, { text: 'Miss' }
                ],
                sortField: 'text',
                maxItems: 1
            };

            vm.editPage = ($state.current.name === 'shell.setup.allUsers.editUser') ? true : false;
            if(vm.editPage){
                vm.viewMode = true;
                setup.getUserById($stateParams.userId).then(function(res){
                    var user = res.data.user[0];
                    vm.newUser = {
                        id: user.userID,
                        initials: user.initials,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.userEmail,
                        designation:user.userDesignation,
                        isAdmin: user.isSuperUser
                    };
                });
            }
            else{
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
            }

        }

        vm.addNewUser = function(){
            if($scope.addNewUser.$valid) {
                setup.addNewUser(vm.newUser).then(
                    function(res){
                        if(res.data === 'AlreadyExist'){
                            toastr.error('User with this email already exist', 'Error');
                        }
                        else if(res.data === 'Saved'){
                            $scope.$broadcast('userChange');
                            $state.go('shell.setup.allUsers',{}, {reload: true});
                        }
                        else if(res.data === 'Error'){
                            toastr.error('User was not saved due to some error on server', 'Error');
                        }
                    }
                );
            }
        };

        vm.editUser = function(){
            vm.viewMode = false;
        };

        vm.updateUser = function(){
            if($scope.addNewUser.$valid) {
                setup.updateUserById(vm.newUser).then(
                    function(res){
                        $state.go('shell.setup.allUsers',{}, {reload: true});
                    }
                );
            }
        };

        vm.changePasswordForUser = function(){

            if(vm.editPage && vm.viewMode){
                modalFactory.changePassword(vm.newUser.id);
            }
        };

    }

}());
