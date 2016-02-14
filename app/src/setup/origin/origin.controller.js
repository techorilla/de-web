/**
 * @ngdoc controller
 * @name app.setup.controller:Origin
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.setup')
		.controller('Origin', Origin);

  /* @ngInject */
	function Origin(setup, toastr, crud, allOrigins){
		var vm = this;
        vm.addOrigin = addOrigin;
        vm.deleteOrigin = deleteOrigin;
        vm.allOrigins = allOrigins;

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.setup.controller:Origin
     * @description
     * My Description rules
     */

        function addOrigin(newOrigin){
            setup.originCrud(newOrigin,null,crud.CREATE).then(function(res){
                if(res.data.success){
                    toastr.success(res.data.message,'Origin Added');
                    vm.allOrigins.push({
                        origin_id: res.data.origin_id, origin_name:vm.newOrigin, operation: operation
                    });
                }
                else{
                    toastr.error(res.data.message,'Error');
                }
                vm.newOrigin = '';
                vm.addNewOrigin.Origin.$setDirty();
                vm.addNewOrigin.$setPristine();
            });
        }

        function deleteOrigin(originId,index){
            setup.originCrud(null,originId,crud.DELETE).then(function(res){
                if(res.data.success){
                    toastr.success(res.data.message,'Origin Delete');
                    vm.allOrigins.splice(1,index);
                }
                else{
                    toastr.error(res.data.message,'Error');
                }
                vm.newOrigin = '';
                vm.addNewOrigin.Origin.$setDirty();
                vm.addNewOrigin.$setPristine();
            });
        }

	}

}());
