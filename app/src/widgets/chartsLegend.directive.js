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
                if(!oldVal){
                    angular.forEach(scope.dataClone,function(){
                        scope.show.push(true);
                    });
                    if(scope.series){
                        var colorsCount = scope.colors.length;

                        while(colorsCount<scope.series.length){
                            scope.colors.push(scope.getRandomColor());
                            colorsCount += 1;
                        }
                    }
                }
                scope.onHideSeries();
            });

            scope.getRandomColor = function(defaultColor) {
                    var letters = '0123456789ABCDEF'.split('');
                    var colors = [
                        '#F47', // red
                        '#169', // blue
                        '#333', // light grey
                        '#6d4', // green
                        '#FDB', // yellow
                        '#949', // grey
                        '#4D5'
                    ];
                    var color = colors[Math.floor(Math.random() * 7)]
                    for (var i = 0; i < 3; i++ ) {
                        color += letters[Math.floor(Math.random() * 16)];
                    }
                    return color;

            };

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
