import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
 
const myApp = angular.module('dating', [
  angularMeteor,
  uiRouter
])

myApp.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider){
	$locationProvider.html5Mode(true);

	 $stateProvider
	    .state('home', {
	      url: '/home',
	      templateUrl: 'client/home.html',
        controller: ['$scope', homeCtrl]
	      // controller:'homeCtrl'
	    })

    	.state('login', {
		    url: '/login',
		    templateUrl: 'client/login.html',
        controller: ['$scope', loginCtrl]
	      // controller:'loginCtrl'
  		});
 
  $urlRouterProvider.otherwise('/home');
}])


/*myApp.controller('homeCtrl', ['$scope', '$meteor', function($scope, $meteor) {
   $scope.login = function(cred){
      console.log("cred>>>>>>", cred);
   }
}]);

myApp.controller('loginCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
	
  }]);

*/