'use strict';

angular.module('12oder3App')
  .controller('DashboardCtrl', 		
  	function(
			$scope,
			$location,
			Localstorage,
			data
		) {
			$scope.users = data.fBase.users;
		});