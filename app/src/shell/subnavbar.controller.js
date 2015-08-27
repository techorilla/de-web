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
	function SubNavBar($state){
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
                vm.navStates.push(state);
              }
            });
        }
	}


}());
