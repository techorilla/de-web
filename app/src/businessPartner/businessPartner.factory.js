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
    function businessPartner(appConfig, apiEndPoints, modalFactory, dataService, dropDownConfig){

        var businessPartner = {};

        return {

            setBusinessPartner: setBusinessPartner,
            getBusinessPartner: getBusinessPartner,
            addBusinessPartner: addBusinessPartner,
            addNewBusinessPartnerContact: addNewBusinessPartnerContact,
            editBusinessPartnerContact: editBusinessPartnerContact,
            addNewBankAccount: addNewBankAccount,
            editBankAccount: editBankAccount,
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
                    dataService.getRequest(apiEndPoints.businessPartner.delete+id,callback);
                }
            });
        }

        function deleteBusinessPartnerContact(bpName, contactName, id, callback){
            modalFactory.alertModal(bpName,'Contact Person ' + contactName + 'Contact Person of Business Partner', 'Delete').then(function(res){
                if(res){
                    dataService.getRequest('deleteBusinessPartnerContact/'+id,callback);
                }
            });
        }

        function deleteBusinessPartnerBankDetail(bpName, accountTitle, accountNumber, id, callback){
            modalFactory.alertModal(bpName,'Bank Account ' + accountNumber + ' of title ' +accountTitle + ' of Business Partner ' , 'Delete').then(function(res){
                if(res){
                    dataService.getRequest('deleteBusinessPartnerBank/'+id,callback);
                }
            });
        }

        function deleteBusinessPartnerContactNumber(bpName, contactNumber, contactType, id, callback){
            modalFactory.alertModal(bpName, contactType + ' Number ' + contactNumber + ' of Business Partner' , 'Delete').then(function(res){
                if(res){
                    dataService.getRequest('deleteBusinessPartnerContactNumber/'+id,callback);
                }
            });
        }

        function addNewBankAccount(bankDetails){
            return dataService.postRequest('addBusinessPartnerBankDetails', {bankDetails: bankDetails});
        }

        function editBankAccount(bankDetails){
            return dataService.postRequest('editBusinessPartnerBankDetails', {bankDetails: bankDetails})
        }

        function addBusinessPartnerContact(contact){
            return dataService.postRequest('addBusinessPartnerContact', {contact: contact});
        }

        function addNewBusinessPartnerContact(contactPerson){
            return dataService.postRequest('addBusinessPartnerContactPerson', {contactPerson: contactPerson});
        }

        function editBusinessPartnerContact(contactPerson){
            return dataService.postRequest('editBusinessPartnerContactPerson', {contactPerson: contactPerson});
        }

        function addBusinessPartnerProduct(bpProduct)
        {
            return dataService.postRequest('addBusinessPartnerProduct', {bpProduct: bpProduct});
        }

        function deleteBusinessPartnerProduct(bpProduct)
        {
            return dataService.postRequest('deleteBusinessPartnerProduct', {bpProduct: bpProduct});
        }

        function addBusinessPartner(businessPartner,callback){
            return dataService.postRequest('addBusinessPartner', {businessPartner: businessPartner}, callback);
        }

        function updateBusinessPartner(businessPartner,callback){
            return dataService.postRequest('updateBusinessPartner', {businessPartner: businessPartner}, callback);
        }

        function getBusinessPartnerList(){
            return dataService.getRequest(apiEndPoints.businessPartner.getList);
        }

        function getBusinessPartnerContactType(){
            return dropDownConfig.contactTypeConfig();
        }

        function getBusinessPartnerComplete(id){
            return dataService.getRequest('getBusinessPartnerFull/'+id);
        }




    }

}());
