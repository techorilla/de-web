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
	function AddProduct(country, productInfo, $state, navigation){
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
        vm.viewMode = ($state.current.name === 'shell.products.viewProduct');
        vm.editMode = ($state.current.name === 'shell.products.viewProduct.edit');
        vm.addMode = ($state.current.name === 'shell.products.addProduct');


        if($state.current.name === 'shell.products.viewProduct'){
            vm.newProduct = productInfo[0];
        }
        else if($state.current.name === 'shell.products.viewProduct.edit'){
            vm.newProduct = productInfo[0];
            vm.viewMode = false;
        }
        else{
            vm.newProduct = new NewProduct();
        }
            vm.singleConfig = {
                valueField: 'code',
                labelField: 'text',
                options: country,
                sortField: 'text',
                maxItems: 1
            };
		}
    function NewProduct(name, origin, quality, specs){
        this.name = name;
        this.origin = origin;
        this.quality = quality | {};
        this.specs = {};
        this.specs.purity = specs.purity;
        this.specs.moisture = specs.moisture;
        this.specs.splits = specs.splits;
        this.specs.broken = specs.broken;
        this.specs.weeviled = specs.weeviled;
        }

    function addProduct(){
            if($state.current.name === 'shell.products.addProduct'){
                vm.newProduct.createdBy = (navigation.getCurrentUser()).id;
                vm.newProduct.createdOn = (new Date()).getTime();
            }
            else if($state.current.name === 'shell.products.viewProduct.edit'){
                vm.newProduct.editedBy = (navigation.getCurrentUser()).id;
                vm.newProduct.editedOn = navigation.getTime();
            }
        }
    vm.headerAnchor = [
        {
            text: 'Edit Product',
            state: 'shell.products.viewProduct.edit({id:'+vm.newProduct.id+'})'
        }
    ];
	}

}());
