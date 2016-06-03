/**
 * @ngdoc object
 * @name app.core.constant:httpStatus
 * @description Commonly consumed HTTP Request Codes exposed as an injectable object
 * @example
 <pre>
 angular.module("someModule", [])
 .controller("some", controller);

 function controller(httpStatus, someService){
  var vm = this;
  someService.get().then(function(res){
    if(res.status === httpStatus.OK){
      vm.users = res.data;
    }
   })
  };
 </pre>
 */

(function(){

    'use strict';




    var apiEndPoints = {
        businessPartner:{
            delete:'deleteBusinessPartner/',
            getList:'getBusinessPartnerList'
        },
        userLogs:{
            getAll:'getAllLogs'
        }

    };

    angular
        .module('app.core')
        .constant('apiEndPoints', apiEndPoints)

}());


