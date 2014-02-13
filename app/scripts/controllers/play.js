'use strict';

angular.module('12oder3App')
    .controller('PlayCtrl',
        function(
            $scope,
            $routeParams,
            $location,
            Localstorage,
            data,
            _
        ) {
            var qid                = $routeParams.qid;
            var userId             = Localstorage.get('uuid');
            var stop;
            $scope.timeOut         = data.timeOut;
            $scope.userScore       = data.fBase.currentUser.$child('score');
            $scope.currentQuestion = data.fBase.questions.$child(qid);
            $scope.currentUser     = data.fBase.currentUser;
            $scope.activeQuestion  = data.fBase.activeQuestion;
            $scope.playTimer       = data.fBase.playTimer.$value;
            $scope.timeOver        = false;

            data.fBase.playTimer.$on('change',function(){
                $scope.playTimer = data.fBase.playTimer.$value;
                if ($scope.playTimer === 0) {
                    $scope.isItRight = testResponse();
                    $scope.timeOver = true;
                };

            });
            // $scope.activeQuestion.$on('loaded',function(){
            //     if ($scope.activeQuestion.$value != qid) {
            //         $location.path('/');
            //     }

            // });


            $scope.vote = function(vote) {
                data.fBase.votes.$child(qid+'/'+userId).$set({
                    'vote':vote,
                    'team':$scope.currentUser.team
                });
                $scope.lastVote = vote;
            }
            // var savedScore = false;

            function testResponse(){
                var result = false ;
                
                if($scope.lastVote == $scope.currentQuestion.correctAnswer) {
                    result = true;
                    var oldScore = $scope.userScore.$value || 0;
                    console.log(new Date().getTime(),'oldScore',oldScore,$scope.lastVote,$scope.currentQuestion.correctAnswer );

                    var newScore =  oldScore + 1;
                    console.log('newScore',newScore, new Date().getTime());
                    $scope.userScore.$set(newScore);
                    // savedScore = true;
                    
                    
                    // $scope.userScore.$set(newScore);
                }
                else {
                    console.log('Wrong Answer!');
                }
            	return result;
            }
            
            
        });
