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
                paginationPageSizes: [25, 50, 75],
                paginationPageSize: 25,
                enableSorting: true,
                data : [],
                enableGridMenu: true,
                enableSelectAll: true,
                exporterCsvFilename: 'allTransactions.csv',
                exporterPdfDefaultStyle: {fontSize: 9},
                exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
                exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
                exporterPdfHeader: { text: "All Transactions", style: 'headerStyle' },
                exporterPdfFooter: function ( currentPage, pageCount ) {
                    return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
                },
                exporterPdfCustomFormatter: function ( docDefinition ) {
                    docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
                    docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
                    return docDefinition;
                },
                exporterPdfOrientation: 'portrait',
                exporterPdfPageSize: 'LETTER',
                exporterPdfMaxGridWidth: 500,
                exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location"))

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
