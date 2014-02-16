'use strict';

angular.module('12oder3App')
  .controller('WaitDashboardCtrl',   	
  	function(
			$scope,
			$location,
			$timeout,
			$document,
			Localstorage,
			helpers,
			data
		) {
  			var totalScore = 0;
			$scope.users = data.fBase.users;
			$scope.teamScore = {};
			$scope.normalizedTeamScore = {
				'1':0,
				'2':0,
				'3':0
			};
		
			var result = [];
			for (var i = 10 - 1; i >= 0; i--) {
				result.push(helpers.getRandom(1,5));
				};
			$scope.setRandomActive = result;

			$timeout(function(){
				[].forEach.call(
				  $document[0].querySelectorAll('.cube'), 
				  function(el){
				    angular.element(el).addClass('set-face-6');
				  }
				);
						
			},10000);

			$scope.shuffleCube = function(){
				return _shuffle([1,2,3,4,5]);
			}

			$scope.users.$on('loaded', function(){
				var max_score = 250;
				var divide = 1;
				var teamScore = {
					'1':0,
					'2':0,
					'3':0
				};
				var normalizedTeamScore = {};
				angular.forEach($scope.users.$getIndex(), function(item){
					// console.log($scope.users[item].team ,$scope.users[item].score);

					var userScore = $scope.users[item].score || 0;
					if ($scope.users[item].team == 1) { teamScore[1] = teamScore[1] + userScore;};
					if ($scope.users[item].team == 2) { teamScore[2] = teamScore[2] + userScore;};
					if ($scope.users[item].team == 3) { teamScore[3] = teamScore[3] + userScore;};
					totalScore += item.score;
				});

				divide = max_score/Math.max(teamScore[1],teamScore[2],teamScore[3]);

				angular.forEach(teamScore,function(el,index){
					// console.log(el,divide,index);
					normalizedTeamScore[index] = Math.floor(el * divide);
					// console.log(el);
				});
				$scope.teamScore = teamScore;
				$scope.normalizedTeamScore = normalizedTeamScore;

				// console.log($scope.teamScore ,normalizedTeamScore);
			});
		});