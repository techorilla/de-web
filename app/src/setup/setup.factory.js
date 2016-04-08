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
  function setup(modalFactory, dataService, appConfig){
		return {
			getAllUsers: getAllUsers,
            addNewUser: addNewUser,
            originCrud: originCrud,
            getAllOrigin: getAllOrigin,
            getChangePasswordObject: getChangePasswordObject,
            submitChangePassword: submitChangePassword,
            getDashboardProducts: getDashboardProducts,
            dashboardProductCRUD: dashboardProductCRUD,
            activateUser: activateUser,
            deActivateUser: deActivateUser
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

        function activateUser(userid,userName,callback){
            modalFactory.alertModal(userName,'Application User', 'Activate').then(function(res){
                if(res){
                    return dataService.postRequest('activateUser',{userId: userid},callback);
                }
            });
        }
        function deActivateUser(userid,userName,callback){
            modalFactory.alertModal(userName,'Application User', 'Deactivate').then(function(res){
                if(res){
                    return dataService.postRequest('deactivateUser',{userId: userid},callback);
                }
            });
        }
	}

}());
