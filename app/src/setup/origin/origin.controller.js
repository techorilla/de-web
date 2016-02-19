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
                        origin_id: res.data.origin_id, origin_name:vm.newOrigin
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

        function deleteOrigin(originId,originName,index){

            setup.originCrud(originName,originId,crud.DELETE).then(function(res){
                if(res.data.success){
                    console.log(index);
                    toastr.success(res.data.message,'Origin Delete');
                    index = vm.allOrigins.indexOf({
                        origin_id: originId, origin_name:originName
                    });
                    vm.allOrigins.splice(index,1);
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