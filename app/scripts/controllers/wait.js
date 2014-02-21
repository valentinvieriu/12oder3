'use strict';

angular.module('12oder3App')
  .controller('WaitCtrl',
        function(
            $scope,
            $routeParams,
            $document,
            $location,
            Localstorage,
            audio,
            data,
            _
        ) {
        	$scope.currentUser     = data.fBase.currentUser;
        	$scope.currentUser.$on('loaded', function(){
                console.log($scope.currentUser);
                $scope.userScore = $scope.currentUser.score;
            });

  });
