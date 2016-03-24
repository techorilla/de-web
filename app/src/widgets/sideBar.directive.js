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
  function sideBar(tradebook,routing,$state){
    var directive = {
          scope: {
              isOpen: '=',
              onClickOutside:'&'
          },
          link: link,
          restrict: 'E',
          templateUrl: 'src/widgets/sideBar.template.html',
          replace:true
    };
    return directive;
    /////////////////////
    function link(scope, elem, attrs){
        scope.closeSideBar = function(){
            scope.onClickOutside();
        };
        scope.searchTransactionOptions = [
            {val: 'tr_fileID', text:'File ID'},
            {val: 'tr_contractID', text:'Contract ID'}
        ];
        scope.recentItems = routing.getRecentlyViewedItems();
        scope.parameter='';
        scope.inputText='';
        scope.inputDate=null;
        scope.transactionSearched = [];
        scope.notFound = false;
        scope.searchPlaceholder = {
            tr_fileID: 'Enter File Id',
            tr_contractID: 'Enter Contract Id'
        };

        scope.clearRecentItems = function(){
            routing.clearRecentItems();
        };

        scope.goToItem = function(item){
            $state.go(item.pageStateName,item.pageStateParams);
        };

        scope.onSearchTransaction = function(){
            if(scope.parameter === 'tr_date'){
                scope.inputDate = scope.inputText;
                scope.inputText = '';

            }
            tradebook.getTransactionByParameter(scope.parameter,scope.inputText, scope.inputDate).then(function(res){
                scope.transactionSearched=res.data.transactions;
                scope.notFound = (scope.transactionSearched.length === 0);
            });
        };
    }
  }

}());
