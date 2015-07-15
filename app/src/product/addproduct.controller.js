/**
 * @ngdoc controller
 * @name app.product.controller:AddProduct
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.product')
		.controller('AddProduct', AddProduct);

  /* @ngInject */
	function AddProduct(country, productInfo){
		var vm = this;
        init();
        vm.addProduct = addProduct;


    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.product.controller:AddProduct
     * @description
     * My Description rules
     */
    function init(){
			vm.newProduct = new newProduct();
            vm.singleConfig = {
                valueField: 'code',
                labelField: 'text',
                options: country,
                sortField: 'text',
                maxItems: 1
            };
		}
    function newProduct(name, origin, quality, purity, moisture, splits, broken, weeviled){
        this.name = name;
        this.origin = origin;
        this.quality = quality | {};
        this.specs = {};
        this.specs.purity = purity;
        this.specs.moisture = moisture;
        this.specs.splits = splits;
        this.specs.broken = broken;
        this.specs.weeviled = weeviled;
        }

    function addProduct(){
            console.log(vm.newProduct);
        }
	}

}());
