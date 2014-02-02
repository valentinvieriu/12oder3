'use strict';

angular.module('12oder3App')
  .factory('data', 
    function (
      $firebase,
      $http,
      $q,
      $rootScope,
      _,
      Localstorage,
      Uuids
      ) {
    var fBase = {};

    function init() {
      var firebaseUrl   = 'https://12oder3.firebaseio.com/';
      var currentUserId = Localstorage.get('uuid');
      if (!currentUserId) {
        currentUserId = 'user_'+Uuids.newuuid();
        Localstorage.set('uuid',currentUserId);
      };

    fBase.userVote = $firebase( new Firebase(firebaseUrl+'votes/'+currentUserId+'/vote') );
    // ref.onDisconnect().remove();
    fBase.allVotes = $firebase( new Firebase(firebaseUrl+'votes/') );

    };

    function getSlide(sushiid, slideid) {
      var deferred = $q.defer();
      var params = {
        sushiid : sushiid,
        slideid : slideid
      };

      $http({method: 'GET', url: 'api/getslide.php', "params":params })
        .success(function(data, status, headers, config) {
          deferred.resolve(data);
        })
        .error(function(data, status, headers, config) {
          deferred.reject("ERROR geting slide",data, status, headers, config);
          console.warn("ERROR geting slide",data, status, headers, config);
        });
      return deferred.promise;
    }


    return {
      init  : init,
      fBase : fBase
    };
  });
