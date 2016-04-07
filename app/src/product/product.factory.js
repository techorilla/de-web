/**
 * @ngdoc service
 * @name app.product.product
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.product')
        .factory('product', product);

    /* @ngInject */
    function product($http,appConfig, $filter, modalFactory, dataService, appFormats){
        return {
            getAllProducts: getAllProducts,
            getProductById:getProductById,
            addNewProduct: addNewProduct,
            deleteProduct: deleteProduct,
            getAllProductPdf: getAllProductPdf,
            editProduct: editProduct,
            getProductPricesByDate: getProductPricesByDate,
            dailyProductsPricesCrud: dailyProductsPricesCrud,
            productSalesAnalytics: productSalesAnalytics
        };

        ////////////////////

        /**
         * @ngdoc
         * @name app.product.product#testFunction
         * @methodOf app.product.product
         *
         * @description < description placeholder >
         * @example
         * <pre>
         * product.testFunction(id);
         * </pre>
         * @param {int} entity id
         */



        function editProduct(product,callback){
            var req = {
                method: 'POST',
                url: appConfig.apiHost+'editProduct',
                headers: {
                    'Content-Type': "application/json"
                },
                data: {product: product}
            };
            return $http(req)
                .success(function (response) {
                    callback(response);
                });
        }
        function getAllProducts(){
            return dataService.getRequest('getAllproducts');
        }

        function getAllProductPdf(){
            return $http.get(appConfig.apiHost+'getAllProductPDF', {responseType: "arraybuffer"});
        }

        function deleteProduct(name, id, callback){
            modalFactory.alertModal(name,'Product', 'Delete').then(function(res){
                if(res){
                    var req = {
                        method: 'GET',
                        url: appConfig.apiHost+'deleteProduct/'+id,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        data: {id: id}
                    };
                    return $http(req)
                        .success(function (response) {
                            callback(response);
                        });
                }
            });
        }

        function getProductById(id){
            var req = {
                method: 'GET',
                url: appConfig.apiHost+'getProduct/'+id,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                data: {id: id}
            };
            return $http(req);
        }

        function getProductPricesByDate(date){
            var req = {
                method: 'POST',
                url: appConfig.apiHost+'getProductsPricesByDate',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                data: {date: date}
            };

            return $http(req);

        }


        function productSalesAnalytics(startDate, endDate){
            var sDate = $filter('date')(new Date(startDate), appFormats.DBDate);
            var eDate = $filter('date')(new Date(endDate), appFormats.DBDate);
            var req = {
                method: 'GET',
                url: appConfig.apiHost+'productSalesAnalyticsByDateRange?startDate=' + sDate + '&endDate='+eDate,
                headers:{
                    'Content-Type': "application/json"
                }

            };
            return $http(req);
        }


        function addNewProduct(product, callback){
            var req = {
                method: 'POST',
                url: appConfig.apiHost+'addProduct',
                headers: {
                    'Content-Type': "application/json"
                },
                data: {product: product}
            };
            return $http(req)
                .success(function (response) {
                    callback(response);
                });
        }

        function dailyProductsPricesCrud(product,operation){
            return dataService.getCrudRequest('productPriceByDateCrud',product, operation);
        }
    }

}());
