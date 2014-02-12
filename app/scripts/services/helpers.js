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
        var userType = Localstorage.get('userType') || 'user';
        return  userType.indexOf(type)!= -1;
      }
    };
  });
