
(function () {

    'use strict';

    angular.module('app.core').run(onApplicationRun);

    function onApplicationRun ($rootScope, $location,$cookieStore, $http, Idle, authentication) {

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

}());