/**
 * @ngdoc service
 * @name app.analytics.analytics
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.analytics')
        .factory('analytics', analytics);

    /* @ngInject */
    function analytics(){
        return {
            getTimeDrillOptions: getTimeDrillOptions,
            getBarChartValuesOnTimeDrillChanged: getBarChartValuesOnTimeDrillChanged
        };

        ////////////////////

        /**
         * @ngdoc
         * @name app.analytics.analytics#testFunction
         * @methodOf app.analytics.analytics
         *
         * @description < description placeholder >
         * @example
         * <pre>
         * analytics.testFunction(id);
         * </pre>
         * @param {int} entity id
         */

        function getTimeDrillOptions(){
            return [
                {text:'By Day', value: 'day', order:1},
                {text:'By Week', value:'week', order:2},
                {text:'By Month', value:'month', order:3},
                {text:'By Year', value:'year', order:4}
            ];
        }

        function getBarChartValuesOnTimeDrillChanged(dataBarCharts,tranInDate){
            dataBarCharts[0].push(
                _.sumBy(tranInDate,function(tran){
                    return tran.quantity;
                })
            );
            dataBarCharts[1].push(_.sumBy(tranInDate,function(tran){
                return (tran.quantity*tran.rate);
            }));
            dataBarCharts[2].push(_.sumBy(tranInDate,function(tran){
                if(tran.commission === 'Not Entered'){
                    return 0;
                }
                else{
                    tran.commission = tran.commission.replace('$','');
                    return (parseInt(tran.commission));
                }
            }));
        }
    }

}());
