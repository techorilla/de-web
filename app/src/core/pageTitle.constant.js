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

  var pageTitle = {
      shell:{
          setup:{
              newUser: 'Add New User',
              allUsers: 'All Users',
              origin:'Origins Page'
          },
          products:{
              all: 'All Products',
              addProduct: 'Add New Product',
              viewProduct: 'Product'
          },
          dashboard:'Application Dashboard',
          businessPartner: 'All Business Partner'
      }
  };

  angular
    .module('app.core')
    .constant('pageTitle', pageTitle)


}());
