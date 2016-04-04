/**
 * @ngdoc service
 * @name app.common.dataService
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.common')
        .factory('dataService', dataService);

    /* @ngInject */
    function dataService(appConfig,$http){
        return {
            getCrudRequest: getCrudRequest,
            getRequest: getRequest,
            postRequest: postRequest
        };

        function getRequestObj(reqType,url){
            return {
                method: reqType,
                url: appConfig.apiHost+url,
                headers: {
                    'Content-Type': "application/json",
                    'Access-Control-Allow-Origin': '*'
                }
            };
        }

        function getCrudRequest(url,data, operation){
            data.operation = operation;
            return postRequest(url,{data: data});
            return req;
        }

        function postRequest(url, data){
            var req = getRequestObj('POST',url);
            req.data = data;
            return $http(req);
        }

        function getRequest(url){
            return $http(getRequestObj('GET',url));
        }

    }

}());
