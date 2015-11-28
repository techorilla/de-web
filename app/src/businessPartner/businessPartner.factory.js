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
  function businessPartner(appConfig, $http, modalFactory){
		return {
            addBusinessPartner: addBusinessPartner,
            addNewBusinessPartnerContact: addNewBusinessPartnerContact,
            addNewBankAccount: addNewBankAccount,
            addBusinessPartnerContact: addBusinessPartnerContact,

            getBusinessPartnerList: getBusinessPartnerList,
            getBusinessPartnerComplete: getBusinessPartnerComplete,

            deleteBusinessPartner: deleteBusinessPartner,
            deleteBusinessPartnerContact: deleteBusinessPartnerContact,
            deleteBusinessPartnerBankDetail: deleteBusinessPartnerBankDetail

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

      function deleteBusinessPartner(name, id ,callback){
        modalFactory.alertModal(name,'Business Partner', 'Delete').then(function(res){
            if(res){
                var req = {
                    method: 'GET',
                    url: appConfig.apiHost+'deleteBusinessPartner/'+id,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    data: {id: id}
                }
                return $http(req)
                    .success(function (response) {
                        callback(response);
                    });
            }
        });
      }

      function deleteBusinessPartnerContact(){

      }

      function deleteBusinessPartnerBankDetail(){

      }

      function addNewBankAccount(bankDetails){
          var req = {
              method: 'POST',
              url: appConfig.apiHost+'addBusinessPartnerBankDetails',
              headers: {
                  'Content-Type': "application/json"
              },
              data: {bankDetails: bankDetails}
          };
          return $http(req);
      }

      function addBusinessPartnerContact(contact){
          var req = {
              method: 'POST',
              url: appConfig.apiHost+'addBusinessPartnerContact',
              headers: {
                  'Content-Type': "application/json"
              },
              data: {contact: contact}
          };
          return $http(req);
      }



      function addNewBusinessPartnerContact(contactPerson){
        var req = {
            method: 'POST',
            url: appConfig.apiHost+'addBusinessPartnerContactPerson',
            headers: {
                'Content-Type': "application/json"
            },
            data: {contactPerson: contactPerson}
        };
        return $http(req);

      }
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

      function getBusinessPartnerList(){
          var req = {
              method: 'GET',
              url: appConfig.apiHost+'getBusinessPartnerList',
              headers: {
                  'Content-Type': "application/json"
              }
          }
          return $http(req);
      }

      function getBusinessPartnerComplete(id){
          var req = {
              method: 'GET',
              url: appConfig.apiHost+'getBusinessPartnerFull/'+id,
              headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
              },
              data: {id: id}
          }
          return $http(req);
      }

	}

}());
