/**
 * @ngdoc overview
 * @name app.core
 * @description Filters for the Applications
 */

(function () {

    'use strict';

    angular.module('app.core')
        .filter('selectFilter', selectFilter)
        .filter('selectedRows', selectedRows)
        .filter('range', range);

    function selectFilter() {
            return function(items, search, bind) {
                if (!search) {
                    return items;
                }
                return items.filter(function(element, index, array) {
                    if(element[bind]){
                        return element[bind].toLowerCase().indexOf(search.toLowerCase())===0;
                    }
                });

            };
    }

    function selectedRows(){
        return function(rows,rowsToRemove,bind){

            if(rowsToRemove.length === 0){
                return rows;
            }
            return rows.filter(function(element,index,array){
                if(element[bind]){
                    //return true;
                    return ((rowsToRemove.indexOf(element[bind])) <= -1)
                }
            });
        }
    }

    function range(){
        return function(input, total) {
            total = parseInt(total);
            for (var i=0; i<total; i++)
                input.push(i);
            return input;
        };
    }

}());
