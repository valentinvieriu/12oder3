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
		$scope.questions = data.fBase.questions;
		data.fBase.playTimer.$bind($scope, 'playTimer');
		
		// data.fBase.playTimer.$on('loaded',function(){
		// 	$scope.playTimer = data.timeOut + 1;
		// });

		$scope.waitMode = function() {
			data.fBase.playDashboard.$set('/wait-dashboard');
			data.fBase.playPage.$set('/wait');
			$interval.cancel(stop)
			stop = undefined;
		};
		$scope.setQuestion = function(qid) {
			data.fBase.playPage.$set('/play/' + qid);
			data.fBase.playDashboard.$set('/play-dashbard/' + qid);
			$scope.playTimer = data.timeOut + 1;
		};
		$scope.startTimer = function() {
			$interval.cancel(stop)
			stop = undefined;

			$scope.playTimer = 10;
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