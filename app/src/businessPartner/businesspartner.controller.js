/**
 * @ngdoc controller
 * @name app.businessPartner.controller:BusinessPartner
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.businessPartner')
		.controller('BusinessPartner', BusinessPartner);

  /* @ngInject */
	function BusinessPartner(){
		var vm = this;
        init();

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.businessPartner.controller:BusinessPartner
     * @description
     * My Description rules
     */
    function init(){
            vm.headerAnchor = [
                {
                    text: 'Add new Business Partner',
                    state: 'shell.businessPartner.addBusinessPartner'
                }
            ];
            vm.allBusinessPartner = {};
            vm.allBusinessPartner.tableHeadings = [
                {name: 'Name'},{name:'Contact Person'},{name:'Type'},{name:'Origin'},{name:'Rating'},{name:'Last Transaction On'}
            ];

        }
	}

}());
