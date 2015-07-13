/**
 * @ngdoc controller
 * @name app.tradebook.controller:AddTransaction
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.tradebook')
		.controller('AddTransaction', AddTransaction);

  /* @ngInject */
	function AddTransaction($scope){
		var vm = this;

		vm.testFunction = testFunction;
    //=======================================================
  //Single Item Select
  //=======================================================
  $scope.single = null;
  
  $scope.singleConfig = {
    options: [{value: 1, text: 'Chuck Testa', email:'chucktesla@gmail,com'}, {value: 2, text:'Nikola Tesla',email:'nuckTesla@gmail.com'}],
    create: true,
    sortField: 'text',
    maxItems: 1
  }
  
 

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.tradebook.controller:AddTransaction
     * @description
     * My Description rules
     */
    function testFunction(num){
			console.info('This is a test function');
		}
	}

}());
