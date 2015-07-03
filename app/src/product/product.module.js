/**
 * @ngdoc overview
 * @name app.product
 * @description < description placeholder >
 */

(function(){

  'use strict';

  angular
    .module('app.product', [])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider){

    $stateProvider
      .state('shell.products', {
        url:'/products',
        view:{
            'content@shell':{
                templateUrl:'src/product/products.html'
            }
        }
      }
    );
  }

}());
