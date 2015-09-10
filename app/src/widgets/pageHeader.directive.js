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
  function pageHeader($state){

    return {
      link: link,
      restrict: 'E',
      templateUrl: 'src/widgets/pageHeader.template.html',
      scope: {
        subHeading: '@',
        heading: '@',
        buttonList: '=',
        goBack:'='
      },
      replace: true
    };

    /////////////////////

    function link(scope, elem, attrs){
        scope.goToBack = function(){
            if($state.current.prevState){
                $state.go($state.current.prevState,$state.current.prevParam);
            }
            else{
                $state.go('^');
            }

        };
    }
  }

}());
