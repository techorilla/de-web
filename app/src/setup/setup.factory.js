/**
 * @ngdoc service
 * @name app.setup.setup
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.setup')
		.factory('setup', setup);

  /* @ngInject */
  function setup($http, dataService, appConfig){
		return {
			getAllUsers: getAllUsers,
            addNewUser: addNewUser,
            originCrud: originCrud,
            getAllOrigin: getAllOrigin,
            getChangePasswordObject: getChangePasswordObject,
            submitChangePassword: submitChangePassword,
            getDashboardProducts: getDashboardProducts,
            dashboardProductCRUD: dashboardProductCRUD
		};

		////////////////////

    /**
     * @ngdoc
     * @name app.setup.setup#testFunction
     * @methodOf app.setup.setup
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * setup.testFunction(id);
     * </pre>
     * @param {int} entity id
     */
        function getDashboardProducts(){
            return dataService.getRequest('getDashboardProducts');
        }

        function dashboardProductCRUD(productId,operation){
            return dataService.postRequest('dashboardProductCRUD',{productId: productId, operation: operation});
        }

        function getAllOrigin(){
            return dataService.getRequest('getAllOrigin');
        }

        function originCrud(originName,originId,operation){
            return dataService.postRequest('originCRUD',{origin_id: originId, origin_name:originName, operation: operation});
        }

		function getAllUsers(){
            return dataService.getRequest('getAppUsers');
		}
        function addNewUser(newUser){
            return dataService.postRequest('addNewUser',{newUser: newUser});
        }

        function getChangePasswordObject(){
            return {
                oldPassword:'',
                newPassword:'',
                confirmPassword:''
            };
        }
        function submitChangePassword(passwordDetails){
            return dataService.postRequest('changePassword',{passwordDetails:passwordDetails});
        }
	}

}());
