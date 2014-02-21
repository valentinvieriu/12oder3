'use strict';

angular.module('12oder3App')
    .controller('ResetCtrl',
        function(
            $scope,
            $location,
            data,
            $timeout,
            Localstorage) {
	            Localstorage.set('uuid','');
	            $timeout(function(){data.init();},100);
        });
