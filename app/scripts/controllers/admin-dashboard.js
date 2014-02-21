'use strict';

angular.module('12oder3App')
	.controller('AdminDashboardCtrl', function(
		$scope,
		$document,
		$rootScope,
		Localstorage,
		$interval,
		$timeout,
		data,
		helpers
	) {
		var stop;
		$document.find('body').addClass('admin');

		$scope.timeOut       = data.timeOut;
		$scope.questions     = data.fBase.questions;
		$scope.usedQuestions = [];
		data.fBase.playTimer.$bind($scope, 'playTimer');
		data.fBase.playTimer.$set(data.timeOut + 1);

		$scope.waitMode = function() {
			data.fBase.playDashboard.$set('/wait-dashboard');
			data.fBase.playPage.$set('/wait');
			data.fBase.activeQuestion.$set("none");
			$interval.cancel(stop)
			stop = undefined;
		};		
		$scope.alocate = function() {
			var team = 0;
			angular.forEach(data.fBase.users.$getIndex(), function(value, index){
				team = (team === 3) ? 1 : (team + 1);
				data.fBase.users.$child(value).$child('team').$set(team);

			});
		};		
		$scope.usedQuestion = function(qid) {
			return $scope.usedQuestions.indexOf(qid) == -1 ? false : true;
		};
		$scope.reset = function() {
			data.fBase.users.$remove();
			data.fBase.votes.$remove();
            data.fBase.playPage.$set('/reset');
            $timeout(function(){          	
				data.fBase.playDashboard.$set('/');
				data.fBase.playPage.$set('/');
				
            },300);
		};

		$scope.lastQuestion = function() {
			data.fBase.playDashboard.$set('/last-question');
			data.fBase.playPage.$set('/last-question');
		};		

		$scope.party = function() {
			data.fBase.playDashboard.$set('/start-party');
			data.fBase.playPage.$set('/start-party');
		};

		$scope.setQuestion = function(qid) {
			data.fBase.playPage.$set('/play/' + qid);
			data.fBase.playDashboard.$set('/play-dashboard/' + qid);
			data.fBase.activeQuestion.$set(qid);
			$scope.playTimer = data.timeOut + 1;
		};
		$scope.startTimer = function(qid) {
			$scope.usedQuestions.push(qid);
			$interval.cancel(stop)
			stop = undefined;

			$scope.playTimer = data.timeOut;
			stop = $interval(function countDown() {
				if ($scope.playTimer == 0) {
					$interval.cancel(stop)
					stop = undefined;
				} else {
					$scope.playTimer -= 1;
				}
			}, 1000);

		};

	// fakeUsers();
	$scope.fakeVoting = fakeVoting;

	$scope.fakeUsers = function fakeUsers() {
		var currentUserId;
		for (var i = 70; i >= 0; i--) {
			$timeout(function(i) {
				var names = 'Austin, Camden, Cameron, Emmett, Griffin, Harrison, Hudson, Jace, Jonah, Kingston, Lincoln, Marcus, Nash, Nathan, Oliver, Parker, Ryan, Ryder, Seth, Xavier'.split(', ');
				data.fBase.users.$add({
					"name": names[helpers.getRandom(0,19)] + ' '+names[helpers.getRandom(0,19)],
					"score": helpers.getRandom(0,19)
				});
			},helpers.getRandom(20, 5000));
		};
	}

	function fakeVoting() {
		var question = data.fBase.activeQuestion;
		var users = data.fBase.users;
		users.$on('loaded', function() {
			var array = users.$getIndex();
			for (var i = 4; i >= 0; i--) {
				angular.forEach(_.shuffle(array), function(userId) {
					var qid = question.$value;
					$timeout(function() {
						data.fBase.votes.$child(qid + '/' + userId).$set({
							'vote': 'a' + helpers.getRandom(1, 3),
							'team': helpers.getRandom(1, 3)
						});
					}, helpers.getRandom(20, 5000))
				})
			};
		})




		
	}

	function cluster(a) {
		var result = [];
		var list = _.reduce(a, function(counts, key) {
				counts[key]++;
				return counts
			},
			_.object(_.map(_.uniq(a), function(key) {
				return [key, 0]
			})));

		_.each(list, function(val, key) {
			if (val > 10) {
				result.push({
					keyword: key,
					count: val
				})
			};
		})
		result = _.sortBy(result, 'count').reverse();
		// Localstorage.set('popularKeywords',result);
		return result;
	}



	});