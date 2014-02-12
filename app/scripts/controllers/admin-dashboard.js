'use strict';

angular.module('12oder3App')
	.controller('AdminDashboardCtrl', function(
		$scope,
		Localstorage,
		$interval,
		data,
		helpers
	) {
		var stop;
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
		$scope.usedQuestion = function(qid) {
			return $scope.usedQuestions.indexOf(qid) == -1 ? false : true;
		};
		$scope.reset = function() {
			data.fBase.users.$remove();
			data.fBase.votes.$remove();
			data.fBase.playDashboard.$set('/');
			data.fBase.playPage.$set('/');
		};
		$scope.setQuestion = function(qid) {
			data.fBase.playPage.$set('/play/' + qid);
			data.fBase.playDashboard.$set('/play-dashbard/' + qid);
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

	});