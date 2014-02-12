'use strict';

angular.module('12oder3App')
	.controller('SetUserTypeCtrl',
		function(
			$scope,
			$routeParams,
			$location,
			Localstorage,
			Uuids
		) {
			var currentUserId;
			if ($routeParams.userType == 'admin' || $routeParams.userType == 'dashboard') {
				currentUserId = $routeParams.userType +'_' + Uuids.newuuid();
				Localstorage.set('uuid', currentUserId);
			}
			else {
				$location.path('/');
			}
		});