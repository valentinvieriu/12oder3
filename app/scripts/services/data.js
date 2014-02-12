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
      var defer = $q.defer();

      fBase.playPage       = $firebase( new Firebase(fBase.firebaseUrl+'playPage/') );
      fBase.playDashboard  = $firebase( new Firebase(fBase.firebaseUrl+'playDashboard/') );
      fBase.activeQuestion = $firebase( new Firebase(fBase.firebaseUrl+'activeQuestion/') );
      fBase.playTimer      = $firebase( new Firebase(fBase.firebaseUrl+'playTimer/') );
      fBase.questions      = $firebase( new Firebase(fBase.firebaseUrl+'questions/') );
      fBase.users          = $firebase( new Firebase(fBase.firebaseUrl+'users/') );
      fBase.votes          = $firebase( new Firebase(fBase.firebaseUrl+'votes/') );

      var currentUserId = Localstorage.get('uuid');
      if (!currentUserId) {
        // currentUserId = 'user_'+Uuids.newuuid();
        fBase.users.$add('newUser').then(function(ref){
          currentUserId     = ref.name();
          fBase.currentUser = $firebase( new Firebase(fBase.firebaseUrl+'users/'+currentUserId) );
          Localstorage.set('uuid',currentUserId);
          Localstorage.set('userType','user');
          defer.resolve();
        });
      } else {
        fBase.currentUser = $firebase( new Firebase(fBase.firebaseUrl+'users/'+currentUserId) );
        defer.resolve();
      }

      
      // ref.onDisconnect().remove();
      return defer.promise;
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
      fBase : fBase,
      timeOut: 10
    };
  });
