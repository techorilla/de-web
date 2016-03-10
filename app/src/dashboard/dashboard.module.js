/**
 * @ngdoc overview
 * @name app.dashboard
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.dashboard', [])
        .config(configuration);

    /* @ngInject */
    function configuration($stateProvider){


        $stateProvider
            .state('shell.dashboard', {
                url:'/dashboard',
                subNav: true,
                subNavTitle: 'Dashboard',
                subNavIndex: 0,
                views:{
                    'content@shell':{
                        templateUrl: 'src/dashboard/dashboard.template.html',
                        controller: 'Dashboard as vm'
                    }
                },
                resolve: {
                    allProducts: function (product) {
                        return product.getAllProducts().then(function (res) {
                            return  res.data;
                        });
                    },
                    productConfig: function(tradebook){
                        return tradebook.getProductConfig();
                    }
                }
            }
        );
    }

}());
