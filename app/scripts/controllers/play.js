'use strict';

angular.module('12oder3App')
    .controller('PlayCtrl',
        function(
            $scope,
            $routeParams,
            $location,
            Localstorage,
            data
        ) {
            var qid                = $routeParams.qid;
            var currentUser        = Localstorage.get('uuid');
            var stop;
            $scope.timeOut         = data.timeOut;
            $scope.currentQuestion = data.fBase.questions.$child(qid);
            $scope.currentUser     = data.fBase.currentUser;
            $scope.activeQuestion  = data.fBase.activeQuestion;
            $scope.playTimer       = data.fBase.playTimer.$value;

            data.fBase.playTimer.$on('change',function(newTime){
                $scope.playTimer = data.fBase.playTimer.$value;

            });
            $scope.activeQuestion.$on('loaded',function(){
                if ($scope.activeQuestion.$value != qid) {
                    $location.path('/');
                }

            });


            $scope.vote = function(vote) {
                data.fBase.votes.$child(qid+'/'+currentUser).$set(vote);
                $scope.lastVote = vote;
            }

            $scope.isItRight = function(){
            	return $scope.lastVote == $scope.currentQuestion.correctAnswer;
            }
            
            
        });
