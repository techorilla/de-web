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
        title:'Products',
        subNavTitle: 'Products',
        subNav: true,
        views:{
            'content@shell':{
                templateUrl:'src/product/products.template.html',
                controller: 'Product as vm'
            }
        }
      }
    ).state('shell.products.addProduct',{
      url:'/addProducts',
      views:{
        'content@shell':{
            templateUrl:'src/product/addProduct.template.html'
        }
      }
    });;
  }

}());
