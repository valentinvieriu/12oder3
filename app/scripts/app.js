'use strict';

angular.module('12oder3App', [
    'firebase',
    'lodash',
    'ngAnimate',
    'ngTouch',
    'ngRoute'
])
    .config(function($routeProvider, $compileProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })

            .when('/admin', {
                templateUrl: 'views/admin-dashboard.html',
                controller: 'AdminDashboardCtrl'
            })
            .when('/admin-add-questions', {
                templateUrl: 'views/admin-add-questions.html',
                controller: 'AdminAddQuestionsCtrl'
            })
            .when('/play/:qid', {
                templateUrl: 'views/play.html',
                controller: 'PlayCtrl',
                resolve : {
                    load : function($q,$route,data){
                        var defer = $q.defer();
                        var qid   = $route.current.params.qid;
                        
                        data.fBase.questions.$child(qid).$on('loaded',function(){
                            defer.resolve('questions loaded');
                        });
                        return defer.promise;
                    }
                }
            })
            .when('/set-user/:userType', {
              template: '<h1>Setting user type ...</h1>',
              controller: 'SetUserTypeCtrl'
            })
            .when('/dashboard', {
              templateUrl: 'views/dashboard.html',
              controller: 'DashboardCtrl'
            })
            .when('/play-dashboard/:qid', {
              templateUrl: 'views/play-dashboard.html',
              controller: 'PlayDashboardCtrl'
            })
            .when('/wait-dashboard', {
              templateUrl: 'views/wait-dashboard.html',
              controller: 'WaitDashboardCtrl'
            })
            .when('/wait', {
              templateUrl: 'views/wait.html',
              controller: 'WaitCtrl'
            })
            .when('/reset', {
              templateUrl: 'views/reset.html',
              controller: 'ResetCtrl'
            })
            .when('/last-question', {
              templateUrl: 'views/last-question.html',
              controller: 'LastQuestionCtrl'
            })
            .when('/start-party', {
              templateUrl: 'views/start-party.html',
              controller: 'StartPartyCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

    })
    .run(function(data, $location, $rootScope, helpers, Localstorage) {
        var browserRoute = $location.path();
        data.init();
        // console.log(helpers.userType('user'),helpers.userType('dashboard'));
        if (helpers.userType('user') || helpers.userType('dashboard')) {
            $rootScope.playPage = helpers.userType('user') ? data.fBase.playPage : data.fBase.playDashboard;
            // console.log(new Date().getTime(), $rootScope.playPage)
            $rootScope.playPage.$on('loaded', function() {
                var newRoute = $rootScope.playPage.$value;
                $location.path(newRoute);
                // console.log($rootScope.playPage.$value);
            })
            $rootScope.playPage.$on('change', function(route) {
                $location.path($rootScope.playPage.$value);
                // console.log($rootScope.playPage.$value);
            });
        }

    });
