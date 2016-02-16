/**
 * @ngdoc directive
 * @name app.widgets.directive:pageBlueContainer
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
    .directive('pageBlueContainer', pageBlueContainer);

  /* @ngInject */
  function pageBlueContainer(){

    return {
      link: link,
      restrict: 'E',
      transclude: true,
      templateUrl: 'src/widgets/pageBlueContainer.template.html',
      scope: {
        test: '=',
        graphContainer:'@'
      }
    };

    /////////////////////

    function link(scope, elem, attrs){

    }
  }

}());
