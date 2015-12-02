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
            deleteBusinessPartnerBankDetail: deleteBusinessPartnerBankDetail,
            deleteBusinessPartnerContactNumber: deleteBusinessPartnerContactNumber

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

      function deleteBusinessPartnerContact(bpName, contactName, id, callback){
          modalFactory.alertModal(bpName,'Contact Person ' + contactName + 'Contact Person of Business Partner', 'Delete').then(function(res){
              if(res){
                  var req = {
                      method: 'GET',
                      url: appConfig.apiHost+'deleteBusinessPartnerContact/'+id,
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

      function deleteBusinessPartnerBankDetail(bpName, accountTitle, accountNumber, id, callback){
          modalFactory.alertModal(bpName,'Bank Account ' + accountNumber + ' of title ' +accountTitle + ' of Business Partner ' , 'Delete').then(function(res){
              if(res){
                  var req = {
                      method: 'GET',
                      url: appConfig.apiHost+'deleteBusinessPartnerBank/'+id,
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

      function deleteBusinessPartnerContactNumber(bpName, contactNumber, contactType, id, callback){
          modalFactory.alertModal(bpName, contactType + ' Number ' + contactNumber + ' of Business Partner' , 'Delete').then(function(res){
              if(res){
                  var req = {
                      method: 'GET',
                      url: appConfig.apiHost+'deleteBusinessPartnerContactNumber/'+id,
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
