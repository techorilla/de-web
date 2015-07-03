/**
 * @ngdoc directive
 * @name app.widgets.directive:sideBar
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
    .directive('sideBar', sideBar);

  /* @ngInject */
  function sideBar(){
    var directive = {
          scope: {
              isOpen: '='
          },
          link: link,
          restrict: 'E',
          templateUrl: 'src/widgets/sideBar.template.html',
          replace:true
    };
    return directive;
    /////////////////////
    function link(scope, elem, attrs){
    }
  }

}());
