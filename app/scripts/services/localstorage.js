'use strict';

angular.module('12oder3App')
  .service('Localstorage', function Localstorage() {
    var STORAGE_ID = '12oder3_';

    var now = function() {return Math.round(new Date().getTime()/1000);};

	return {
		get: function (item) {
			var data = JSON.parse(localStorage.getItem(STORAGE_ID+item) || null);
			if (!(data && data.expires && (data.expires == "never" || data.expires > now()))) {
				localStorage.removeItem(STORAGE_ID+item);
				return null;
			}
			return data.data;
		},

		set: function (item,data,expire) {
			var _expires = expire ? (expire+now()) : 'never';
			var dataToStore = {
				data: data,
				expires: _expires
			}
			localStorage.setItem(STORAGE_ID+item, JSON.stringify(dataToStore));
		}
	};
  });
