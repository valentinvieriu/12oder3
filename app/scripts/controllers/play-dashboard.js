'use strict';

angular.module('12oder3App')
	.controller('PlayDashboardCtrl',
		function(
			$scope,
			$routeParams,
			$location,
			Localstorage,
			data
		) {
			var qid = $routeParams.qid;
			var currentUser = Localstorage.get('uuid');
			var stop;
			$scope.timeOut = data.timeOut;
			$scope.currentQuestion = data.fBase.questions.$child(qid);
			$scope.currentUser = data.fBase.currentUser;
			$scope.playTimer = data.fBase.playTimer.$value;
			$scope.currentVotes = data.fBase.votes.$child(qid);


			data.fBase.playTimer.$on('change', function(newTime) {
				$scope.playTimer = data.fBase.playTimer.$value;

			});

		});