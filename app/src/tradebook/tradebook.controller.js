/**
 * @ngdoc controller
 * @name app.tradebook.controller:Tradebook
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.tradebook')
		.controller('Tradebook', Tradebook);

  /* @ngInject */
	function Tradebook(tradebook){
		var vm = this;
        init();
    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.tradebook.controller:Tradebook
     * @description
     * My Description rules
     */
     function init(){
            vm.searchTransaction = '';
            vm.headerAnchor = [
                {
                    text: 'Add new Transaction',
                    state: 'shell.tradebook.newTransaction'
                }
            ];
            vm.allTransactions = {};
            tradebook.getTransactionList().then(function(res){
                vm.allTransactions.data = res.data.transationList;
            });
            vm.saveTransaction = saveTransaction;
            vm.allTransactions.tableHeadings =  [
                                    {
                                      name:'File No',
                                      filter: true
                                    },
                                    {
                                      name:'Date',
                                      filter:true
                                    },
                                    {
                                      name:'Buyer',
                                      filter:true
                                    },
                                    {
                                      name:'Seller',
                                      filter:true
                                    },
                                    {
                                      name:'Product',
                                      filter:false
                                    },
                                    {
                                      name:'Quantity',
                                      fitler:false
                                    },
                                    {
                                      name:'Rate',
                                      fitler:false
                                    },
                                    {
                                        name:'Commission',
                                        filter:false
                                    }
                                ];
        }
    function saveTransaction(){

        }
	}

}());
