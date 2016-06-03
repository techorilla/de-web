





/**
 * @ngdoc service
 * @name app.authentication.authentication
 * @description < description placeholder >
 */

(function(){

  'use strict';

    angular
        .module('app.authentication').factory('authentication',
            function (Base64, $http, Idle, $rootScope, appConfig, $state,  $cookies,$cookieStore, localStorageService) {
                var service = {};
                var user = {};

                function getUserFromLocalStorage(){
                    if(!user.initials){
                        user = localStorageService.get('user');
                        if(!user){
                            service.getAppUserData();
                        }
                    }
                }

                service.isUserAdmin = function(){
                    getUserFromLocalStorage();
                    return user.isSuperUser;
                };



                service.userLogin = function (username, password, callback) {
                    return $http.post(appConfig.apiHost+'login', { username: username, password: password })
                        .success(function (response) {
                            callback(response);
                            Idle.watch();
                            service.getAppUserData();
                        });
                };

                service.getAppUserData = function(){
                    var req = {
                        method: 'GET',
                        url: appConfig.apiHost+'getUserDetails?email='+$rootScope.globals.currentUser.username
                    };
                    $http(req).then(function(response){
                        if(response.data.success){
                           localStorageService.set('user', response.data.user[0]);
                           user = localStorageService.get('user');
                        }
                    });
                };


                service.SetCredentials = function (username, password, user) {

                    var authdata = Base64.encode(username + ':' + password);
                    var userId = Base64.encode(user + ':' + username);

                    $rootScope.globals = {
                        currentUser: {
                            username: username,
                            authdata: authdata,
                            userId: userId
                        }
                    };

                    $http.defaults.headers.common['Authorization'] = 'basic ' + authdata; // jshint ignore:line
                    $http.defaults.headers.common['userId'] = userId;
                    $cookieStore.put('globals', $rootScope.globals);
                };

                service.ClearCredentials = function () {
                    $rootScope.globals = {};
                    $cookieStore.remove('globals');
                    $http.defaults.headers.common.Authorization = 'basic ';
                    $http.defaults.headers.common.userId = 'userId';
                };

                service.userLogOut = function(){
                    this.user = {};
                    return $http.post(appConfig.apiHost+'logout')
                        .success(function (response) {
                            localStorageService.remove('user');
                            service.ClearCredentials();
                            var lastState = {
                                stateOnLogin: $state.current.name,
                                stateParamsOnLogin: $state.params
                            };
                            if($state.current.name !== 'login'){
                                localStorageService.set('lastState',lastState);
                            }
                            $state.go('login');
                        });

                };



                service.getFullUserName = function(){
                    getUserFromLocalStorage();
                    return user.initials + '.' + user.firstName + ' ' + user.lastName;
                };

                service.getUserId = function(){
                    return ((Base64.decode($rootScope.globals.currentUser.userId).split(':')[0]));
                };

                service.isPostedByCurrentUser = function(userId){
                    return ((userId == ((Base64.decode($rootScope.globals.currentUser.userId).split(':')[0]))));
                };

                return service;
            })

        .factory('Base64', function () {
            /* jshint ignore:start */

            var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

            return {
                encode: function (input) {
                    var output = "";
                    var chr1, chr2, chr3 = "";
                    var enc1, enc2, enc3, enc4 = "";
                    var i = 0;

                    do {
                        chr1 = input.charCodeAt(i++);
                        chr2 = input.charCodeAt(i++);
                        chr3 = input.charCodeAt(i++);

                        enc1 = chr1 >> 2;
                        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                        enc4 = chr3 & 63;

                        if (isNaN(chr2)) {
                            enc3 = enc4 = 64;
                        } else if (isNaN(chr3)) {
                            enc4 = 64;
                        }

                        output = output +
                            keyStr.charAt(enc1) +
                            keyStr.charAt(enc2) +
                            keyStr.charAt(enc3) +
                            keyStr.charAt(enc4);
                        chr1 = chr2 = chr3 = "";
                        enc1 = enc2 = enc3 = enc4 = "";
                    } while (i < input.length);

                    return output;
                },

                decode: function (input) {
                    var output = "";
                    var chr1, chr2, chr3 = "";
                    var enc1, enc2, enc3, enc4 = "";
                    var i = 0;

                    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                    var base64test = /[^A-Za-z0-9\+\/\=]/g;
                    if (base64test.exec(input)) {
                        window.alert("There were invalid base64 characters in the input text.\n" +
                            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                            "Expect errors in decoding.");
                    }
                    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                    do {
                        enc1 = keyStr.indexOf(input.charAt(i++));
                        enc2 = keyStr.indexOf(input.charAt(i++));
                        enc3 = keyStr.indexOf(input.charAt(i++));
                        enc4 = keyStr.indexOf(input.charAt(i++));

                        chr1 = (enc1 << 2) | (enc2 >> 4);
                        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                        chr3 = ((enc3 & 3) << 6) | enc4;

                        output = output + String.fromCharCode(chr1);

                        if (enc3 != 64) {
                            output = output + String.fromCharCode(chr2);
                        }
                        if (enc4 != 64) {
                            output = output + String.fromCharCode(chr3);
                        }

                        chr1 = chr2 = chr3 = "";
                        enc1 = enc2 = enc3 = enc4 = "";

                    } while (i < input.length);

                    return output;
                }
            };

            /* jshint ignore:end */
        });


}());
