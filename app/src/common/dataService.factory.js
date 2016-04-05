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

        function executeApiRequest(req,callBack){
            if(callBack){
                return $http(req).success(function(response){
                    callBack(response);
                });
            }
            else{
                return $http(req);
            }
        }

        function getCrudRequest(url,data,operation,callBack){
            data.operation = operation;
            return postRequest(url,{data: data},callBack);
        }

        function postRequest(url, data,callBack){
            var req = getRequestObj('POST',url);
            req.data = data;
            return executeApiRequest(req,callBack);
        }

        function getRequest(url,callBack){
            var req = getRequestObj('GET',url);
            return executeApiRequest(req,callBack);
        }

    }

}());
