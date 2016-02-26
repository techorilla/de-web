/**
 * @ngdoc overview
 * @name app.analytics
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.analytics', [])
        .config(configuration);

    /* @ngInject */
    function configuration($stateProvider){

        //add your state mappings here

        $stateProvider
            .state('shell.analytics', {
                url:'/analytics',
                subNav: true,
                subNavTitle: 'Business Analytics',
                subNavIndex: 0,
                views:{
                    'content@shell':{
                        templateUrl: 'src/analytics/analytics.template.html',
                        controller: 'Analytics as vm'
                    }
                }
            }
        );
    }

}());
