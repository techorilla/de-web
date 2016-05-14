
(function () {

    'use strict';

    angular.module('app.core')
        .run(onApplicationRun)
        .run(selectizeSetup)
        .run(chartColors);

    function chartColors(navigation){
        var letters = '0123456789ABCDEF'.split('');
        var count = 100;
        var colors = [
            '#A7', // red
            '#18', // blue
            '#29', // light grey
            '#30', // green
            '#41', // yellow
            '#52', // grey
            '#63'
        ];

        while(count>0){
            var color = colors[Math.floor(Math.random() * 7)];
            for (var i = 0; i < 4; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            if(navigation.colors.indexOf(color)===-1){
                navigation.colors.push(color);
                count--;
            }

        }
    }

    function onApplicationRun ($rootScope, $location,$cookieStore, $http, Idle, authentication, appFormats) {
        $rootScope.appFormats = appFormats;
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            Idle.watch();
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            $http.defaults.headers.common.userId = $rootScope.globals.currentUser.userId;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });

        $rootScope.$on('IdleStart', function() {
            // the user appears to have gone idle
        });

        $rootScope.$on('IdleWarn', function(e, countdown) {
            // follows after the IdleStart event, but includes a countdown until the user is considered timed out
            // the countdown arg is the number of seconds remaining until then.
            // you can change the title or display a warning dialog from here.
            // you can let them resume their session by calling Idle.watch()
        });

        $rootScope.$on('IdleTimeout', function() {
            authentication.userLogOut();
        });

        $rootScope.$on('IdleEnd', function() {
            // the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
        });

        $rootScope.$on('Keepalive', function() {
            // do something to keep the user's session alive
        });
    }

    function selectizeSetup(){
        Selectize.define("no-delete", function (options) {
            var self = this;


            this.deleteSelection = (function() {
                var original = self.deleteSelection;

                return function (e) {
                    if (!e || e.keyCode !== 8) {
                        return original.apply(this);
                    }

                    return false;
                };
            })();
        });
    }

}());