'use strict';

angular.module('12oder3App')
    .controller('PlayCtrl',
        function(
            $scope,
            $routeParams,
            data
        ) {
            var qid = $routeParams.qid;
            var stop;
            $scope.currentQuestion = data.fBase.questions.$child(qid);
            $scope.currentUser = data.fBase.currentUser;
            data.fBase.playTimer.$on('change',function(newTime){
                $scope.timeLeft = data.fBase.playTimer.$value;

            });
            $scope.vote = function(vote) {
                data.fBase.userVote.$set(vote);
                $scope.lastVote = vote;
            }

            $scope.isItRight = function(){
            	return $scope.lastVote == $scope.currentQuestion.correctAnswer;
            }
            
            
        });
