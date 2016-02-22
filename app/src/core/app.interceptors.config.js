(function () {

    'use strict';

    angular.module('app.core').config(httpInterceptors);

    function httpInterceptors($httpProvider,httpStatus) {
        $httpProvider.interceptors.push(function($q, $injector) {
            return {
                'responseError': function(rejection){
                    var defer = $q.defer();
                    if(rejection.status == httpStatus.INTERNAL_SERVER_ERROR){
                        $injector.get('navigation').internalServerError(rejection.data,rejection.statusText);
                    }

                    if(rejection.status == httpStatus.UNAUTHORIZED){
                        $injector.get('$state').transitionTo('login');
                    }
                    defer.reject(rejection);
                    return defer.promise;
                },
                'response': function(response) {
                    var defer = $q.defer();
                    if(response.status == httpStatus.OK && (response.data.success === false)){
                        $injector.get('navigation').internalServerError(response.data.message,'Error');
                    }
                    return response;
                }
            };
        });
    }

}());
