/**
 * @ngdoc controller
 * @name app.shell.controller:TopNavBar
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.shell')
		.controller('TopNavBar', TopNavBar);

  /* @ngInject */
	function TopNavBar(authentication, Fullscreen, $state){
		var vm = this;

		vm.isFullScreen = false;
        vm.goToFullScreen = goToFullScreen;
        vm.logOut = logOut;
        vm.onSetupPage = function(){
            return ($state.current.name.substring( 0, 11 )==='shell.setup');
        };
        vm.onLogs = function(){
            return ($state.current.name === 'shell.systemLogs');
        };




    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.shell.controller:TopNavBar
     * @description
     * My Description rules
     */

    function logOut(){
        authentication.userLogOut();
    }   

    function goToFullScreen(){
            if (Fullscreen.isEnabled()){
                Fullscreen.cancel();                
                vm.isFullScreen = false;
            }         
            else{
                Fullscreen.all();                
                vm.isFullScreen = true;
            }         
        }
	}

}());
