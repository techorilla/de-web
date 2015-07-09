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
        subHeading: '@',
        heading: '@',
        buttonList: '='
      },
      replace: true
    };

    /////////////////////

    function link(scope, elem, attrs){
      
    }
  }

}());
