'use strict';

angular.module('12oder3App')
    .controller('PlayCtrl',
        function(
            $scope,
            $routeParams,
            $interval,
            data
        ) {
            var qid = $routeParams.qid;
            var stop;
            $scope.currentQuestion = data.fBase.questions.$child(qid);
            $scope.currentUser = data.fBase.currentUser;
            $scope.vote = function(vote) {
                data.fBase.userVote.$set(vote);
                $scope.lastVote = vote;
            }

            $scope.currentQuestion.$on('loaded',function(){
	            $scope.timeLeft = 10 ;
	            stop = $interval(function countDown() {
	            	if ($scope.timeLeft == 0) {
	            		$interval.cancel(stop)
	            		stop = undefined;
	            	}
	            	else {
	            		$scope.timeLeft -= 1;
	            	}
	            }, 1000);
            });

            $scope.isItRight = function(){
            	return $scope.lastVote == $scope.currentQuestion.correctAnswer;
            }
            
            
        });
