/**
 * @ngdoc directive
 * @name app.widgets.directive:chartsLegend
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
        .directive('chartsLegend', chartsLegend);

    /* @ngInject */
    function chartsLegend($timeout){

        return {
            restrict: 'E',
            //replace: true,
            templateUrl: 'src/widgets/chartsLegend.template.html',
            link: link,
            scope:{
                type:'@',
                data:"=",
                colors:'=',
                series:'=',
                labels:'=',
                showChart:'=',
                pieType:'@'
            }
        };

        /////////////////////

        function link(scope, elem, attrs){

            scope.show=[];

            scope.$watch('data',function(newVal,oldVal){
                scope.showCh = false;
                scope.dataClone = angular.copy(newVal);
                scope.showCh = scope.showChart;
                scope.pieLabels = [];

                    angular.forEach(scope.dataClone,function(val,key){
                        if(scope.type == 'pie'){
                            var temp = {
                              name: scope.labels[key],
                              value: val,
                              color: scope.colors[key]
                            };
                            scope.pieLabels.push(temp);
                        }
                        if(!oldVal){
                            scope.show.push(true);
                        }
                    });

                scope.onHideSeries();
            });

            scope.$watch('showChart',function(newVal){
                scope.showCh = newVal;
            });

            scope.onHideSeries = function(){
                scope.showCh = false;
                var output = [];
                angular.copy(scope.data, output);
                    for(var i=0; i<output.length; i++){
                        if (scope.show[i] === false){
                            if(scope.type === 'bar' || scope.type === 'line'){
                                for(var j=0; j<output[i].length; j++){
                                    output[i][j] = null;
                                }
                            }
                            else{
                                output[i] = null;
                            }
                        }
                    }
                scope.dataClone = output;
                scope.showCh = true;
            };
        }
    }

}());
