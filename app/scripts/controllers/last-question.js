'use strict';

angular.module('12oder3App')
    .controller('LastQuestionCtrl',
        function(
        	$timeout,
            $scope,
            helpers,
            _
        ) {
        	$scope.showResponse = false;
        	$timeout(function(){
        		$scope.showResponse = true;
        	},30000)
            $scope.randomTeamMember = helpers.getRandom(1, 9);

            $scope.randomItems = _.shuffle([1, 2, 3, 4, 5]).slice(0, 3);
        });
