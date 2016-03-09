/**
 * @ngdoc directive
 * @name app.widgets.directive:dashboardCard
 * @scope true
 * @param {object} test test object
 * @restrict E
 *
 * @description < description placeholder >
 *
 */

(function(){

    'use strict';

    angular
        .module('app.widgets')
        .directive('dashboardCard', dashboardCard);

    /* @ngInject */
    function dashboardCard(){

        return {
            link: link,
            restrict: 'E',
            transclude: true,
            replace:true,
            templateUrl: 'src/widgets/dashboardCard.template.html',
            scope: {
                heading: '@'
            }
        };

        /////////////////////

        function link(scope, elem, attrs){
            console.info('This is a link function of the directive');
        }
    }

}());
