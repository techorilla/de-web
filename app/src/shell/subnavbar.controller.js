/**
 * @ngdoc controller
 * @name app.shell.controller:SubNavBar
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.shell')
        .controller('SubNavBar', SubNavBar);

    /* @ngInject */
    function SubNavBar($state,authentication){
        var vm = this;
        vm.navStates = [];
        init();


        /////////////////////

        /**
         * @ngdoc method
         * @name testFunction
         * @param {number} num number is the number of the number
         * @methodOf app.shell.controller:SubNavBar
         * @description
         * My Description rules
         */
        function init(){
            $state.get()
                .forEach(function(state){
                    if(state.subNav === true){
                        if(state.userAdminOnly && authentication.isUserAdmin()){
                            vm.navStates.push(state);
                        }
                        else if(!state.userAdminOnly){
                            vm.navStates.push(state);
                        }

                    }
                });
        }
    }


}());
