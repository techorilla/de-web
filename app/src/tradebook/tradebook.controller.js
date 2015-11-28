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
	function Tradebook(tradebook,toastr){
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
            vm.gridOptions = {
                enableSorting: true,
                data : []
            };
            tradebook.getTransactionList().then(function(res){
                if(!res.data.success){
                    toastr.error(res.data.message, 'Error');
                }
                else{
                    console.log(res.data.transactions);
                    vm.gridOptions.data = res.data.transactions;

                }

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
