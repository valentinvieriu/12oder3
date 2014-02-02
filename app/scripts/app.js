'use strict';

angular.module('12oder3App', [
  'firebase',
  'lodash',
  'ngAnimate',
  'ngRoute'
])
  .config(function ($routeProvider,$compileProvider) {
    $routeProvider
      .when('/', {
        templateUrl : 'views/main.html',
        controller  : 'MainCtrl'
      })

      .when('/admin-dashboard', {
        templateUrl: 'views/admin-dashboard.html',
        controller: 'AdminDashboardCtrl'
      })
      .when('/admin-add-questions', {
        templateUrl: 'views/admin-add-questions.html',
        controller: 'AdminAddQuestionsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  })
  .run(function(data) {
    data.init();
  });
