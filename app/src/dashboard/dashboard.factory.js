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
  function dashboard(){
		return {
            getBarChartsConfig: getBarChartsConfig
		};


        function getPieChartConfig(){

        }

        function getBarChartsConfig(){
            return {

                options: {
                    //This is the Main Highcharts chart config. Any Highchart options are valid here.
                    //will be overriden by values specified below.
                    chart: {
                        type: 'areaspline'

                    },
                    tooltip: {
                        style: {
                            padding: 10,
                                fontWeight: 'bold'
                        }
                    }
                },
                //The below properties are watched separately for changes.

                //Series object (optional) - a list of series using normal Highcharts series options.
                series:  [
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
                ],
                    //Title configuration (optional)
                    title: {
                text: 'Hello'
            },
                //Boolean to control showing loading status on chart (optional)
                //Could be a string if you want to show specific loading text.
                loading: false,
                    //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
                    //properties currentMin and currentMax provided 2-way binding to the chart's maximum and minimum
                    xAxis: {
                    currentMin: 0,
                    currentMax: 4,
                    title: {text: 'values'}
            },
                //Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
                useHighStocks: false,
                    //size (optional) if left out the chart will default to size of the div or something sensible.


                //function (optional)
                func: function (chart) {
                    //setup some logic for the chart
                }
            };
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
