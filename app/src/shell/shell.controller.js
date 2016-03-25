/**
 * @ngdoc controller
 * @name app.shell.controller:Shell
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.shell')
        .controller('Shell', Shell);

    /* @ngInject */
    function Shell(navigation, usSpinnerService){
        var vm = this;
        usSpinnerService.spin('spinner-1');
        init();
        function init(){
            vm.invertSideBar = invertSideBar;
            vm.sideBarStatus = navigation.sideBarStatus;
            vm.closeSideBar = closeSideBar;
        }


        /////////////////////

        /**
         * @ngdoc method
         * @name testFunction
         * @param {number} num number is the number of the number
         * @methodOf app.shell.controller:Shell
         * @description
         * My Description rules
         */
        function invertSideBar(){
            navigation.invertSideBarState();
        }

        function closeSideBar(){
            navigation.invertSideBarState(true);
        }
    }

}());
