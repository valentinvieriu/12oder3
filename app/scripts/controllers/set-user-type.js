'use strict';

angular.module('12oder3App')
	.controller('SetUserTypeCtrl',
		function(
			$scope,
			$routeParams,
			$location,
			Localstorage
		) {
			var currentUserId;
			if ($routeParams.userType == 'admin' || $routeParams.userType == 'dashboard') {
				Localstorage.set('userType',$routeParams.userType);
				$location.path('/'+$routeParams.userType);
			}
			else {
				$location.path('/');
			}
		});