'use strict';

angular.module('12oder3App')
    .controller('MainCtrl', 
        function(
            $scope, 
            $location,
            data,
            helpers,
            _,
            Uuids,
            Localstorage
        ) 
{	$scope.name = Localstorage.get('name');
	$scope.currentUser = data.fBase.currentUser;
    $scope.saveName =  function(name) {
        data.fBase.currentUser.$child('name').$set(name);
        $scope.name = name;
    }
     
});