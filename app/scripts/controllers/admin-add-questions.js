'use strict';

angular.module('12oder3App')
    .controller('AdminAddQuestionsCtrl', function(
        $scope,
        Localstorage,
        data
    ) {
        var emtyQuestion = {
            question: "Question description",
            a1: "answer 1",
            a2: "answer 2",
            a3: "answer 3",
            correctAnswer: "a1",
            longAnswer: "",
            votes: 0
        };
        $scope.questions = data.fBase.questions;
        // console.log($scope.questions.$getIndex());
        // data.fBase.questions.$bind($scope,'questions');

        $scope.remainingVotes = Localstorage.get('remainingVotes') == null ? 10 : Localstorage.get('remainingVotes');

        $scope.$watch('remainingVotes', function(newValue, oldValue) {
            if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
                Localstorage.set('remainingVotes', newValue);
            }
        });

        $scope.addQuestion = function() {
            $scope.questions.$add(emtyQuestion);
        };
        $scope.upVote = function(key) {
            $scope.questions[key].votes += 1;
            $scope.questions.$save(key);
            $scope.remainingVotes -= 1;
        };
        $scope.downVote = function(key) {
            $scope.questions[key].votes -= 1;
            $scope.questions.$save(key);
            $scope.remainingVotes -= 1;
        };
        $scope.delete = function(key) {
            $scope.questions.$remove(key);
        };
        $scope.save = function(key) {
            $scope.questions.$save(key);
        };
        $scope.saveQuestions = function() {
            $scope.questions.$save();
        };

    });
