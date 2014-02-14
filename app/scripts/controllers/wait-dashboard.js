'use strict';

angular.module('12oder3App')
  .controller('WaitDashboardCtrl',   	
  	function(
			$scope,
			$location,
			Localstorage,
			data
		) {
  			var totalScore = 0;
			$scope.users = data.fBase.users;
			$scope.teamScore = {
				'1':0,
				'2':0,
				'3':0
			};
			$scope.users.$on('loaded', function(){
				angular.forEach($scope.users.$getIndex(), function(item){
					// console.log($scope.users[item].team ,$scope.users[item].score);
					var userScore = $scope.users[item].score || 0;
					if ($scope.users[item].team == 1) { $scope.teamScore[1] = $scope.teamScore[1] + userScore;};
					if ($scope.users[item].team == 2) { $scope.teamScore[2] = $scope.teamScore[2] + userScore;};
					if ($scope.users[item].team == 3) { $scope.teamScore[3] = $scope.teamScore[3] + userScore;};
					totalScore += item.score;
				});
				// console.log($scope.teamScore );
			});
		});