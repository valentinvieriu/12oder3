'use strict';

angular.module('12oder3App')
  .factory('helpers', 
    function (
      Uuids,
      Localstorage
      ) {


    
    return {
      "getRandom" :function (min, max) {
			  return Math.floor(Math.random() * (max - min + 1) + min);
			},
      "userType" :function (type) {
        return Localstorage.get('uuid').indexOf(type) != -1;
      }
    };
  });
