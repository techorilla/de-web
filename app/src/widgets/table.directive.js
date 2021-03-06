/**
 * @ngdoc directive
 * @name app.widgets.directive:table
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
    .directive('deTable', table);

  /* @ngInject */
  function table(){

    return {
      link: link,
      restrict: 'E',
      templateUrl: 'src/widgets/table.template.html',
      scope: {
        test: '=',
        colHeadings: '=',
        rows: '='
      }
    };

    /////////////////////

    function link(scope, elem, attrs){

    }
  }

}());
