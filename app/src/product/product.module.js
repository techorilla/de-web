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
      .state('shell.products',{
          url:'/products',
          controller: function($state){
             $state.go('shell.products.all');
          }
        })
      .state('shell.products.all', {
        url:'/all',
        title:'Products',
        subNavTitle: 'Products',
        subNav: true,
        resolve: {
          product: 'product',
          allProducts: function(product){
              return product.getAllProducts().then(function(res){
                  return res.data;
              });
          }
        },
        views:{
            'content@shell':{
                templateUrl:'src/product/products.template.html',
                controller: 'Product as vm'
            }
        }
      }
    ).state('shell.products.addProduct',{
      url:'/add',
      views:{
        'content@shell':{
            templateUrl:'src/product/addProduct.template.html',
            controller: 'AddProduct as vm'
        }
      },
      resolve: {
        tabFilter: 'tabFilter',
        country: function (tabFilter) {
          return tabFilter.getAllCountries().then(function (res) {
              return res.data.country;
          });
        },
        productInfo: function () {
            return null;
        }
      }
    }).state('shell.products.viewProduct',{
        url:'/:id',
        views:{
            'content@shell':{
                templateUrl:'src/product/addProduct.template.html',
                controller: 'AddProduct as vm'
            }
        },
        resolve: {
            tabFilter: 'tabFilter',
            product: 'product',
            country: function (tabFilter) {
                return tabFilter.getAllCountries().then(function (res) {
                    return res.data.country;
                });
            },
            productInfo: function (product, $stateParams) {
                return  product.getProductById($stateParams.id).then(function (res) {
                    return res.data.product;
                });
            }
        }
    })
    .state('shell.products.viewProduct.edit',{
        url:'/edit',
        views:{
            'content@shell':{
                templateUrl:'src/product/addProduct.template.html',
                controller: 'AddProduct as vm'
            }
        }
    })
    .state('shell.products.all.report',{
        url:'/report',
        views:{
            'content@shell':{
                templateUrl:'src/product/allProductsPdf.html',
                controller: 'AllProductPdf as vm'
            }
        },
        resolve:{
            pdf: function(product){
                return product.getAllProductPdf().then(function(res){
                    return res;
                })
            }
        }
    });
  }

}());
