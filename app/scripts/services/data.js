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
    var fBase = {
        firebaseUrl: 'https://12oder3.firebaseio.com/'
    };

    function init() {
      var currentUserId = Localstorage.get('uuid');
      if (!currentUserId) {
        currentUserId = 'user_'+Uuids.newuuid();
        Localstorage.set('uuid',currentUserId);
      };

    fBase.userVote    = $firebase( new Firebase(fBase.firebaseUrl+'votes/'+currentUserId+'/vote') );
    fBase.questions   = $firebase( new Firebase(fBase.firebaseUrl+'questions/') );
    fBase.users       = $firebase( new Firebase(fBase.firebaseUrl+'users/') );
    fBase.currentUser = $firebase( new Firebase(fBase.firebaseUrl+'users/'+currentUserId) );
    // ref.onDisconnect().remove();
    fBase.allVotes = $firebase( new Firebase(fBase.firebaseUrl+'votes/') );

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
