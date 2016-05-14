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
    function AllUsers(allUsers, setup, $state){
        var vm = this;
        init();

        function init(){
            vm.allUsers = {};
            vm.allUsers.users = allUsers;
            vm.allUsers.heading = [
                "User Name", "Designation", "E-mail", "Activation", "Created On"
            ];

            vm.searchUser = '';
            vm.viewMode = false;
            vm.changeUserActivation = changeUserActivation;
            vm.goToAddNewUser = goToAddNewUser;
        }

        function goToAddNewUser(){
            $state.go('shell.setup.allUsers.newUser');
        }

        function changeUserActivation(userId,username,activation,user){
            if(activation){
                setup.deActivateUser(userId,username,function(response){
                    if(response.success){
                        user.isActivated = false;
                    }
                });
            }
            else{
                setup.activateUser(userId,username,function(response){
                   if(response.success){
                       user.isActivated = true;
                   }
                });
            }
        }

    }

}());
