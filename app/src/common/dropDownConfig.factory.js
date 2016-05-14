/**
 * @ngdoc service
 * @name app.common.dropDownConfig
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.common')
        .factory('dropDownConfig', dropDownConfig);

    /* @ngInject */
    function dropDownConfig(){
        return {
            contactTypeConfig: contactTypeConfig
        };

        function contactTypeConfig(){
            return {
                plugins: {
                    'no-delete': {}
                },
                valueField: 'text',
                labelField: 'text',
                options: [
                    {
                        "id":1,
                        "text":"Fax Numbers"
                    },
                    {
                        "id":2,
                        "text": "Mobile"
                    },
                    {
                        "id":3,
                        "text": "Office"
                    },
                    {
                        "id":4,
                        "text": "Residential"
                    }
                ],
                sortField: 'text',
                maxItems: 1
            };
        }
    }

}());
