/**
 * @ngdoc overview
 * @name app.core
 * @description Filters for the Applications
 */

(function () {

    'use strict';

    angular.module('app.core')
        .filter('selectFilter', selectFilter);

    function selectFilter() {
            return function(items, search, bind) {
                if (!search) {
                    return items;
                }
                return items.filter(function(element, index, array) {
                    return element[bind].toLowerCase().indexOf(search.toLowerCase())===0;
                });

            };
    }

}());
