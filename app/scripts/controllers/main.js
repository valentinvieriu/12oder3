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
        Localstorage.set('name',name);
        data.fBase.currentUser.$child('name').$set(name);
        $scope.name = name;
    }
     
     // var currentUserId;
     // for (var i = 70; i >= 0; i--) {
     // 	// currentUserId = 'user_'+Uuids.newuuid();
     //  	data.fBase.users.$add({"name":i});
     //  }; 
     //  // console.log(list);
     //  // console.log(generatePopularKeywords(list));
     //  function generatePopularKeywords(a){
     //    var result = [];
     //    var list = _.reduce(a,function(counts,key){ counts[key]++; return counts },
     //             _.object( _.map( _.uniq(a), function(key) { return [key, 0] })));

     //    _.each(list,function(val,key){
     //        if (val > 10) { result.push({keyword:key,count:val})};
     //    })
     //    result = _.sortBy(result,'count').reverse();
     //    // Localstorage.set('popularKeywords',result);
     //    return result;
     //  }      
});