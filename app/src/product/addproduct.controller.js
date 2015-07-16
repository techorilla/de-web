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
	function AddProduct(country, productInfo, $state){
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
        vm.viewMode = false;
        vm.editMode = false;
        vm.addMode = false;

        if($state.current.name === 'shell.products.viewProduct'){
            vm.newProduct = productInfo[0];
            vm.viewMode = true;
        }
        else if($state.current.name === 'shell.products.viewProduct.edit'){
            vm.newProduct = productInfo[0];
            vm.editMode = true;
        }
        else{
            vm.newProduct = new newProduct();
            vm.addMode = true;
        }

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
    vm.headerAnchor = [
        {
            text: 'Edit Product',
            state: 'shell.products.viewProduct.edit({id:vm.newProduct.id})'
        }
    ];
	}

}());
