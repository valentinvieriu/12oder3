'use strict';

angular.module('12oder3App', [
    'firebase',
    'lodash',
    'ngAnimate',
    'ngRoute'
])
    .config(function($routeProvider, $compileProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })

        .when('/admin-dashboard', {
            templateUrl: 'views/admin-dashboard.html',
            controller: 'AdminDashboardCtrl'
        })
            .when('/admin-add-questions', {
                templateUrl: 'views/admin-add-questions.html',
                controller: 'AdminAddQuestionsCtrl'
            })
            .when('/play/:qid', {
                templateUrl: 'views/play.html',
                controller: 'PlayCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

    })
    .run(function(data, $location, $rootScope) {
        var browserRoute = $location.path();
        data.init();
        $rootScope.playPage = data.fBase.playPage;

        $rootScope.playPage.$on('loaded', function() {
            var newRoute = $rootScope.playPage.$value;


            console.log(browserRoute, newRoute.indexOf('admin'))
            if (browserRoute.indexOf('admin') == -1) {
                $location.path(newRoute);
            };

            console.log($rootScope.playPage.$value)
        })

        $rootScope.playPage.$on('change', function(route) {
            if (route && browserRoute.indexOf('admin') == -1) {
                $location.path(route);
            };
        });

    });
