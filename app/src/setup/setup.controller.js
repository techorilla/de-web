/**
 * @ngdoc controller
 * @name app.setup.controller:Setup
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.setup')
		.controller('Setup', Setup);

  /* @ngInject */
	function Setup($state){
		var vm = this;
        vm.setupStates = [];
        init();        
        

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.setup.controller:Setup
     * @description
     * My Description rules
     */
    
        function init(){
          $state.get()
          .forEach(function(state){          
              if(state.inSetup){
                vm.setupStates.push(state);
              }
          });
        }
      
        
     

	}

}());
