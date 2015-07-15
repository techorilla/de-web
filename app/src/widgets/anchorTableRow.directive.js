/**
 * @ngdoc directive
 * @name app.widgets.directive:anchorTableRow
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
    .directive('anchorTableRow', anchorTableRow);

  /* @ngInject */
  function anchorTableRow($state){

    return {
      link: link,
      restrict: 'E',
      templateUrl: 'src/widgets/anchorTableRow.template.html',
      scope: {
        IsAnchor: '=',
        state:'@',
        id:'@',
        text: '@',
        isArray: '='
      }
    };

    /////////////////////

    function link(scope, elem, attrs){
        console.log(scope);
      scope.goToState = function(){
          $state.go(scope.state, {
              id: scope.id
          });
      }
    }
  }

}());
