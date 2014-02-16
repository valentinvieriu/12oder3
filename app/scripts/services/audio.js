'use strict';

angular.module('12oder3App')
  .factory('audio', function($document) {
    var audio = $document[0].createElement('audio');
    return audio;
  });