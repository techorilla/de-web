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
	function AddProduct($scope, originConfig, productInfo, $state, navigation, product, toastr, $stateParams, modalFactory){
		var vm = this;
        init();
        vm.addProduct = addProduct;
        vm.deleteProduct = deleteProduct;
        vm.saveProduct = saveProduct;



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
        vm.quality;
        vm.viewMode = ($state.current.name === 'shell.products.viewProduct');
        vm.editMode = ($state.current.name === 'shell.products.viewProduct.edit');
        vm.addMode = ($state.current.name === 'shell.products.addProduct');
        vm.singleConfig = originConfig;



        if(vm.viewMode ||  vm.editMode) {
            vm.newProduct = productInfo;
            console.log(vm.newProduct);
            if (productInfo.quality !== null && productInfo.quality!== '') {
                var quality = productInfo.quality.split(', ');
                vm.quality = [];
                angular.forEach(quality, function (value, key) {
                    vm.quality.push({'text': value});
                });
            }
            if (vm.viewMode) {
                vm.headerAnchor = [
                    {
                        text: 'Edit Product',
                        state: 'shell.products.viewProduct.edit({id:' + vm.newProduct.id + '})'
                    }
                ];
            }
            else {
                vm.viewMode = false;
            }
        }


        else if(vm.addMode){
            vm.newProduct = new NewProduct();
        }

		}
    function NewProduct(name, origin, quality, purity, moisture, splits, weeviled,greenDamaged,damaged,foreignMatter,otherColor,wrinkled){
        this.name = name;
        this.origin = origin;
        this.quality = '';
        this.specs = {};
        this.specs.purity = purity;
        this.specs.moisture = moisture;
        this.specs.splits = splits;
        this.specs.weeviled = weeviled;
        this.specs.greenDamaged = greenDamaged;
        this.specs.damaged = damaged;
        this.specs.foreignMatter = foreignMatter;
        this.specs.otherColor = otherColor;
        this.specs.wrinkled = wrinkled;
        }

    function deleteProduct(){
        product.deleteProduct(vm.newProduct.name, vm.newProduct.id,function(response){
            if (response.success) {
                toastr.success(response.message, 'Success');
                $state.go('shell.products.all');
            }
        });
    }

    function saveProduct(){
        if(!vm.productForm.$valid) {
            toastr.error('Invalid Information', 'Error');
            return;
        }
        var quality = _.pluck(vm.quality,'text');
        quality = quality.join(', ');
        vm.newProduct.quality = quality;
        product.editProduct(vm.newProduct,function(response){
            if (response.success) {
                toastr.success(response.message, 'Success');
                $state.go('shell.products.all');
            }
        });
    }

    function addProduct(){
        if(!vm.productForm.$valid) {
            toastr.error('Invalid Information', 'Error');
            return;
        }

            if($state.current.name === 'shell.products.addProduct'){
                var quality = _.pluck(vm.quality,'text');
                quality = quality.join(', ');
                vm.newProduct.quality = quality;
                product.addNewProduct(vm.newProduct,function(response){
                    if (response.success) {
                        toastr.success(response.message, 'Success');
                        $state.go('shell.products.all');
                    }
                });
            }
        }

	}

}());
