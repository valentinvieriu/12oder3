'use strict';

angular.module('12oder3App')
    .controller('MainCtrl', 
        function(
            $scope, 
            data
        ) 
{
    $scope.message = "Hello World";

    $scope.vote =  function(vote) {
        data.fBase.userVote.$set(vote);
    }
            
});