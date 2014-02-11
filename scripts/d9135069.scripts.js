"use strict";angular.module("12oder3App",["firebase","lodash","ngAnimate","ngRoute"]).config(["$routeProvider","$compileProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/admin-dashboard",{templateUrl:"views/admin-dashboard.html",controller:"AdminDashboardCtrl"}).when("/admin-add-questions",{templateUrl:"views/admin-add-questions.html",controller:"AdminAddQuestionsCtrl"}).when("/play/:qid",{templateUrl:"views/play.html",controller:"PlayCtrl"}).otherwise({redirectTo:"/"})}]).run(["data","$location","$rootScope",function(a,b,c){var d=b.path();a.init(),c.playPage=a.fBase.playPage,c.playPage.$on("loaded",function(){var a=c.playPage.$value;console.log(d,a.indexOf("admin")),-1==d.indexOf("admin")&&b.path(a),console.log(c.playPage.$value)}),c.playPage.$on("change",function(a){a&&-1==d.indexOf("admin")&&b.path(a)})}]),angular.module("12oder3App").controller("MainCtrl",["$scope","data",function(a,b){a.message="Hello World",a.vote=function(a){b.fBase.userVote.$set(a)}}]),angular.module("12oder3App").factory("data",["$firebase","$http","$q","$rootScope","_","Localstorage","Uuids",function(a,b,c,d,e,f,g){function h(){var b=f.get("uuid");b||(b="user_"+g.newuuid(),f.set("uuid",b)),i.playPage=a(new Firebase(i.firebaseUrl+"playPage/")),i.playTimer=a(new Firebase(i.firebaseUrl+"playTimer/")),i.userVote=a(new Firebase(i.firebaseUrl+"votes/"+b+"/vote")),i.questions=a(new Firebase(i.firebaseUrl+"questions/")),i.users=a(new Firebase(i.firebaseUrl+"users/")),i.currentUser=a(new Firebase(i.firebaseUrl+"users/"+b)),i.allVotes=a(new Firebase(i.firebaseUrl+"votes/"))}var i={firebaseUrl:"https://12oder3.firebaseio.com/"};return{init:h,fBase:i}}]),angular.module("12oder3App").factory("helpers",["Uuids",function(){return{getRandom:function(a,b){return Math.floor(Math.random()*(b-a+1)+a)}}}]),angular.module("12oder3App").service("Localstorage",function(){var a="12oder3_",b=function(){return Math.round((new Date).getTime()/1e3)};return{get:function(c){var d=JSON.parse(localStorage.getItem(a+c)||null);return d&&d.expires&&("never"==d.expires||d.expires>b())?d.data:(localStorage.removeItem(a+c),null)},set:function(c,d,e){var f=e?e+b():"never",g={data:d,expires:f};localStorage.setItem(a+c,JSON.stringify(g))}}}),angular.module("lodash",[]).factory("_",["$window",function(a){return a._}]),angular.module("12oder3App").factory("Uuids",function(){return{newuuid:function(){for(var a=[],b="0123456789abcdef",c=0;36>c;c++)a[c]=b.substr(Math.floor(16*Math.random()),1);return a[14]="4",a[19]=b.substr(3&a[19]|8,1),a[8]=a[13]=a[18]=a[23]="-",a.join("")}}}),angular.module("12oder3App").controller("AdminDashboardCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("12oder3App").controller("AdminAddQuestionsCtrl",["$scope","Localstorage","data",function(a,b,c){var d={question:"Question description",a1:"answer 1",a2:"answer 2",a3:"answer 3",correctAnswer:"a1",longAnswer:"",votes:0};a.questions=c.fBase.questions,a.remainingVotes=null==b.get("remainingVotes")?10:b.get("remainingVotes"),a.$watch("remainingVotes",function(a,c){a!==c&&b.set("remainingVotes",a)}),a.addQuestion=function(){a.questions.$add(d)},a.upVote=function(b){a.questions[b].votes+=1,a.questions.$save(b),a.remainingVotes-=1},a.downVote=function(b){a.questions[b].votes-=1,a.questions.$save(b),a.remainingVotes-=1},a.delete=function(b){a.questions.$remove(b)},a.save=function(b){a.questions.$save(b)},a.saveQuestions=function(){a.questions.$save()}}]),angular.module("12oder3App").controller("PlayCtrl",["$scope","$routeParams","$interval","data",function(a,b,c,d){var e,f=b.qid;a.currentQuestion=d.fBase.questions.$child(f),a.currentUser=d.fBase.currentUser,a.vote=function(b){d.fBase.userVote.$set(b),a.lastVote=b},a.currentQuestion.$on("loaded",function(){a.timeLeft=10,e=c(function(){0==a.timeLeft?(c.cancel(e),e=void 0):a.timeLeft-=1},1e3)}),a.isItRight=function(){return a.lastVote==a.currentQuestion.correctAnswer}}]);