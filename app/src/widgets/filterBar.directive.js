/**
 * @ngdoc directive
 * @name app.widgets.directive:filterBar
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
    .directive('filterBar', filterBar);

  /* @ngInject */
  function filterBar(){

    return {
      link: link,
      restrict: 'E',
      templateUrl: 'src/widgets/filterBar.template.html',
      scope: {
        test: '='
      }
    };

    /////////////////////

    function link(scope, elem, attrs){
      console.info('This is a link function of the directive');
    }
  }

}());
