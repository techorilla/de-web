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

      var businessPartner = {};

      return {

          setBusinessPartner: setBusinessPartner,
          getBusinessPartner: getBusinessPartner,

          addBusinessPartner: addBusinessPartner,
          addNewBusinessPartnerContact: addNewBusinessPartnerContact,
          addNewBankAccount: addNewBankAccount,
          addBusinessPartnerContact: addBusinessPartnerContact,
          addBusinessPartnerProduct: addBusinessPartnerProduct,

          updateBusinessPartner:updateBusinessPartner,

          getBusinessPartnerList: getBusinessPartnerList,
          getBusinessPartnerComplete: getBusinessPartnerComplete,
          getBusinessPartnerContactType: getBusinessPartnerContactType,

          deleteBusinessPartner: deleteBusinessPartner,
          deleteBusinessPartnerContact: deleteBusinessPartnerContact,
          deleteBusinessPartnerBankDetail: deleteBusinessPartnerBankDetail,
          deleteBusinessPartnerContactNumber: deleteBusinessPartnerContactNumber,
          deleteBusinessPartnerProduct: deleteBusinessPartnerProduct

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
      function setBusinessPartner(bp){
         this.businessPartner = bp;
      }

      function getBusinessPartner(){
          return this.businessPartner;
      }
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
                };
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
                  };
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
                  };
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
                  };
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

      function addBusinessPartnerProduct(bpProduct)
      {
          var req = {
              method: 'POST',
              url: appConfig.apiHost+'addBusinessPartnerProduct',
              headers: {
                  'Content-Type': "application/json"
              },
              data: {bpProduct: bpProduct}
          };
          return $http(req);
      }

      function deleteBusinessPartnerProduct(bpProduct)
      {
          var req = {
              method: 'POST',
              url: appConfig.apiHost+'deleteBusinessPartnerProduct',
              headers: {
                  'Content-Type': "application/json"
              },
              data: {bpProduct: bpProduct}
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
        };
        return $http(req)
            .success(function (response) {
                callback(response);
            });
      }

      function updateBusinessPartner(businessPartner,callback){
          var req = {
              method: 'POST',
              url: appConfig.apiHost+'updateBusinessPartner',
              headers: {
                  'Content-Type': "application/json"
              },
              data: {businessPartner: businessPartner}
          };
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
          };
          return $http(req);
      }

      function getBusinessPartnerContactType(){
          return {
              valueField: 'text',
              labelField: 'text',
              options: [
                  {
                      "id":1,
                      "text":"Fax Numbers"
                  },
                  {
                      "id":2,
                      "text": "Mobile"
                  },
                  {
                      "id":3,
                      "text": "Office"
                  },
                  {
                      "id":4,
                      "text": "Residential"
                  }
              ],
              sortField: 'text',
              maxItems: 1
          };
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
          };
          return $http(req);
      }

	}

}());
