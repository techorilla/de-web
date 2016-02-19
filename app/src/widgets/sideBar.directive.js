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
  function sideBar(tradebook){
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
        scope.searchTransactionOptions = [
            {val: 'tr_fileID', text:'File ID'},
            {val: 'tr_contractID', text:'Contract ID'},
            {val: 'tr_date', text:'Transaction Date'}
        ];
        scope.parameter='';
        scope.inputText='';
        scope.inputDate=null;
        scope.transactionSearched = [];
        scope.notFound = false;
        scope.searchPlaceholder = {
            tr_fileID: 'Enter File Id',
            tr_contractID: 'Enter Contract Id',
            tr_date: 'Enter Date (dd/mm/yyyy)'
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
