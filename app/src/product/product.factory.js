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
            return dataService.postRequest('editProduct', {product: product},callback);
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
                    return dataService.getRequest('deleteProduct/'+id,callback);
                }
            });
        }

        function getProductById(id){
            return dataService.getRequest('getProduct/'+id,null);
        }

        function getProductPricesByDate(date){
            return dataService.postRequest('getProductsPricesByDate', {date: date}, null);
        }

        function productSalesAnalytics(startDate, endDate){
            var sDate = $filter('date')(new Date(startDate), appFormats.DBDate);
            var eDate = $filter('date')(new Date(endDate), appFormats.DBDate);
            return dataService.getRequest('productSalesAnalyticsByDateRange?startDate=' + sDate + '&endDate='+eDate,null);
        }


        function addNewProduct(product, callback){
            return dataService.postRequest('addProduct', {product: product}, callback);
        }

        function dailyProductsPricesCrud(product,operation){
            return dataService.getCrudRequest('productPriceByDateCrud',product, operation);
        }
    }

}());
