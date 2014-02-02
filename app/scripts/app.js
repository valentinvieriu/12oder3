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

      .otherwise({
        redirectTo: '/'
      });

  })
  .run(function(data) {
    data.init();
  });
