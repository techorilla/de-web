/**
 * @ngdoc directive
 * @name app.widgets.directive:pageHeader
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
    .directive('pageHeader', pageHeader);

  /* @ngInject */
  function pageHeader(){

    return {
      link: link,
      restrict: 'E',
      templateUrl: 'src/widgets/pageHeader.template.html',
      scope: {
        test: '='
      },
      replace: true
    };

    /////////////////////

    function link(scope, elem, attrs){
      console.info('This is a link function of the directive');
    }
  }

}());
