'use strict';

angular.module('lodash', [])
  .factory('_', function ($window) {
    // this is a wrapper for lodash
    return $window._ ;
  });
