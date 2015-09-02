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
        }
      ).
      state('shell.setup.newUser',{
        url:'/newUser',
        inSetup: 'true',
        inSetupTitle: 'New User',
        views:{
            'subContent@shell.setup':{
                templateUrl: 'src/setup/newUser/addNewUser.template.html',
                controller: 'NewUser as vm'
            }
        },
        resolve:{
            userRights: function(setup){
                return setup.getUserRights().then(function(res){
                    return res.data.userRights;
                });
            }
        }
      }).

      state('shell.setup.allUsers',{
          url:'/allUsers',
          inSetup: 'true',
          inSetupTitle: 'All Users',
          resolve: {
              setup: 'setup',
              allUsers: function (setup) {
                  return setup.getAllUsers().then(function (res) {
                      return res.data.allUsers;
                  });
              }
          },
          views:{
              'subContent@shell.setup':{
                    templateUrl: 'src/setup/allUsers/allUsers.template.html',
                    controller: 'AllUsers as vm'
              }
          }
      }).
      state('shell.setup.userRights',{
        url:'/userRights',
        inSetup: 'true',
        inSetupTitle: 'User Rights',
         views:{
             'subContent@shell.setup':{
                 templateUrl: 'src/setup/userRights.template.html'
             }
         }
      }).
      state('shell.setup.brokerBookSetup',{
        url:'/brokerBookSetup',
        inSetup: 'true',
        inSetupTitle: 'Broker Book Setup',
         views:{
             'subContent@shell.setup':{
                 templateUrl:'src/setup/brokerBookSetup.template.html'
             }
         }
      });
  }

}());
