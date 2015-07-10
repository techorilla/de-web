/**
 * @ngdoc directive
 * @name app.widgets.directive:customFilter
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
    .directive('customFilter', customFilter);

  /* @ngInject */
  function customFilter(){

    return {
      link: link,
      restrict: 'E',
      templateUrl: 'src/widgets/customFilter.template.html',
      scope: {
        test: '='
      },
      replace:true
    };

    /////////////////////

    function link(scope, elem, attrs){
      scope.showOptions = false;
      scope.invertShowOptions = function(){
        scope.showOptions = !scope.showOptions;
      }
      console.info('This is a link function of the directive');
    }
  }

}());
