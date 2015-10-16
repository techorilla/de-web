/**
 * @ngdoc service
 * @name app.businessPartner.businessPartner
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.businessPartner')
		.factory('businessPartner', businessPartner);

  /* @ngInject */
  function businessPartner(appConfig, $http){
		return {
            addBusinessPartner: addBusinessPartner
		};

		////////////////////

    /**
     * @ngdoc
     * @name app.businessPartner.businessPartner#testFunction
     * @methodOf app.businessPartner.businessPartner
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * businessPartner.testFunction(id);
     * </pre>
     * @param {int} entity id
     */
      function addBusinessPartner(businessPartner,callback){
        var req = {
            method: 'POST',
            url: appConfig.apiHost+'addBusinessPartner',
            headers: {
                'Content-Type': "application/json"
            },
            data: {businessPartner: businessPartner}
        }
        return $http(req)
            .success(function (response) {
                callback(response);
            });
      }

	}

}());
