/**
 * @ngdoc overview
 * @name app.setup
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.setup', [])
        .config(configuration);

    /* @ngInject */
    function configuration($stateProvider){

        //add your state mappings here
        $stateProvider
            .state('shell.setup', {
                url:'/setup',
                views:{
                    'content@shell':{
                        templateUrl: 'src/setup/setup.template.html',
                        controller: 'Setup as vm'
                    }
                }
            })
            .state('shell.setup.allUsers.newUser',{
                url:'/newUser',
//                inSetup: 'true',
//                inSetupTitle: 'New User',
//                inSetupOrder: 5,
                userAdminOnly: true,
                views:{
                    'subContent@shell.setup':{
                        templateUrl: 'src/setup/newUser/addNewUser.template.html',
                        controller: 'NewUser as vm'
                    }
                }
            })
            .state('shell.setup.allUsers.editUser',{
                url:'/editUser/:userId',
                userAdminOnly: true,
                views:{
                    'subContent@shell.setup':{
                        templateUrl: 'src/setup/newUser/addNewUser.template.html',
                        controller: 'NewUser as vm'
                    }
            }
            })
            .state('shell.setup.allUsers',{
                url:'/allUsers',
                inSetup: 'true',
                inSetupTitle: 'All Users',
                inSetupOrder: 4,
                userAdminOnly: true,
                resolve: {
                    setup: 'setup',
                    allUsers: function (setup) {
                        return setup.getAllUsers().then(function (res) {
                            return res.data.user;
                        });
                    }
                },
                views:{
                    'subContent@shell.setup':{
                        templateUrl: 'src/setup/allUsers/allUsers.template.html',
                        controller: 'AllUsers as vm'
                    }
                }
            })
            .state('shell.setup.changePassword',{
                url:'/changePassword',
                inSetup:'true',
                inSetupTitle: 'Change Password',
                inSetupOrder: 1,
                views:{
                    'subContent@shell.setup':{
                        templateUrl: 'src/setup/changePassword/changePassword.template.html',
                        controller: 'ChangePassword as vm'
                    }
                }
            })
//      .state('shell.setup.userRights',{
//        url:'/userRights',
//        inSetup: 'true',
//        inSetupTitle: 'User Rights',
//         views:{
//             'subContent@shell.setup':{
//                 templateUrl: 'src/setup/userRights.template.html'
//             }
//         }
//      }).
//      state('shell.setup.brokerBookSetup',{
//        url:'/brokerBookSetup',
//        inSetup: 'true',
//        inSetupTitle: 'Broker Book Setup',
//         views:{
//             'subContent@shell.setup':{
//                 templateUrl:'src/setup/brokerBookSetup.template.html'
//             }
//         }
//      })
            .state('shell.setup.origin',{
                url:'/origin',
                inSetup: 'true',
                inSetupTitle: 'Origin',
                inSetupOrder: 2,
                resolve:{
                    allOrigins: function (setup) {
                        return setup.getAllOrigin().then(function (res) {
                            return res.data.origins;
                        });
                    }
                },
                views:{
                    'subContent@shell.setup':{
                        templateUrl:'src/setup/origin/origin.html',
                        controller: 'Origin as vm'
                    }
                }
            })
            .state('shell.setup.dashboardProduct',{
                url:'/dashboardProducts',
                inSetup: 'true',
                inSetupTitle: 'My Dashboard Products',
                inSetupOrder: 2,
                resolve:{
                    allProducts: function (product) {
                        return product.getAllProducts().then(function(res){
                            return  res.data;
                        });
                    },
                    productConfig: function(tradebook){
                        return tradebook.getProductConfig();
                    }
                },
                views:{
                    'subContent@shell.setup':{
                        templateUrl:'src/setup/dashboardProducts/dashboardProducts.template.html',
                        controller: 'DashboardProducts as vm'
                    }
                }
            })
            .state('shell.productPrices',{
                url:'/productPrices',
                resolve:{
                    allProducts: function (product) {
                        return product.getAllProducts().then(function(res){
                            return  res.data;
                        });
                    },
                    productConfig: function(tradebook){
                        return tradebook.getProductConfig();
                    }
                },
                views:{
                    'content@shell':{
                        templateUrl:'src/setup/dailyProductPrices/dailyProductPrices.template.html',
                        controller: 'DailyProductPrice as vm'
                    }
                }
            });
    }

}());
