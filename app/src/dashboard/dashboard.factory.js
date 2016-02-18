/**
 * @ngdoc service
 * @name app.dashboard.dashboard
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.dashboard')
		.factory('dashboard', dashboard);

  /* @ngInject */
  function dashboard($timeout,$compile){

        var chartType={
          pie: 'pie',
          areaSpline: 'areaspline'

        };
        return {
            getBarChartsConfig: getBarChartsConfig,
            getPieChartConfig: getPieChartConfig,
            getBasicChartConfig: getBasicChartConfig
		};

        function getBasicChartConfig(type, title, series,scope){
            return {
              options:{
                  title: title,
                  chart:{
                      type: type,
                      options3d: {
                          enabled: true,
                          alpha: 45
                      },
                      tooltip:  {
                          style: {
                              padding: 10,
                              fontWeight: 'bold'
                          }
                      },
                      zoomType:'x',
                      width:1180
                  }
              },
              series: series,
              loading: false,
              func: function (chart) {

                    //setup some logic for the chart
              }
            };
        }

        function getPieChartConfig(title,scope){
            var series = [
                {
                    name: 'Delivered amount',
                    data: [
                        ['Bananas', 8],
                        ['Kiwi', 3],
                        ['Mixed nuts', 1],
                        ['Oranges', 6],
                        ['Apples', 8],
                        ['Pears', 4],
                        ['Clementines', 4],
                        ['Reddish (bag)', 1],
                        ['Grapes (bunch)', 1]
                    ]
                }
            ];

            var config = getBasicChartConfig(
                chartType.pie,
                title,
                series,
                scope
            );

            config.options.plotOptions = {
                pie: {
                    innerSize: 100,
                        depth: 45,
                        dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            };
            return config;
        }

        function getBarChartsConfig(title, scope){

            var xaxis = {
                currentMin: 0,
                currentMax: 4,
                title: {text: 'values'}
            };

            var series = [
                {
                    "name": "Some data",
                    "data": [
                        1,
                        2,
                        4,
                        7,
                        3
                    ],
                    "id": "series-0"
                },
                {
                    "name": "Some data 3",
                    "data": [
                        3,
                        1,
                        null,
                        5,
                        2
                    ],
                    "connectNulls": true,
                    "id": "series-1"
                },
                {
                    "name": "Some data 2",
                    "data": [
                        5,
                        2,
                        2,
                        3,
                        5
                    ],
                    "type": "column",
                    "id": "series-2"
                },
                {
                    "name": "My Super Column",
                    "data": [
                        1,
                        1,
                        2,
                        3,
                        2
                    ],
                    "type": "column",
                    "id": "series-3"
                }
            ];

            var config = getBasicChartConfig(
                chartType.areaSpline,
                title,
                series,
                scope
            );

            return config;


        }

		////////////////////

    /**
     * @ngdoc
     * @name app.dashboard.dashboard#testFunction
     * @methodOf app.dashboard.dashboard
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * dashboard.testFunction(id);
     * </pre>
     * @param {int} entity id
     */

	}

}());
