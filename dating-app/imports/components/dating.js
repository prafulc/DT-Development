import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';
import { RegUsers } from '../collections/reg_users.js';
 
export default angular.module('dating', [
  angularMeteor,
  uiRouter
])
.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider){
	$locationProvider.html5Mode(true);

	 $stateProvider
	    .state('home', {
	      url: '/home',
	      templateUrl: 'client/home.html',
        // controller: ['$scope', homeCtrl]
	      controller:'homeCtrl'
	    })

    	.state('login', {
		    url: '/login',
		    templateUrl: 'client/login.html',
        // controller: ['$scope', loginCtrl]
	      controller:'loginCtrl'
  		});
 
  $urlRouterProvider.otherwise('/home');
}])

.controller('homeCtrl', ['$scope', '$meteor','$state', function($scope, $meteor, $state) {
   
   $scope.login = function(cred){
      var userCount = RegUsers.find({"email":cred.email, "password":cred.password}).count()
      $scope.cred.email = '';
      $scope.cred.password = '';
      if(userCount==0){
        $state.go('login');
      }
   }

   $scope.register = function(regCred){
      Meteor.call('addUser', regCred);
      
      $scope.regCred.firstname = '';
      $scope.regCred.lastname = '';
      $scope.regCred.mobile = '';
      $scope.regCred.email = '';
      $scope.regCred.password = '';
      $scope.regCred.file = '';
      $scope.regCred.male = '';
      $scope.regCred.female = '';
   }

}])

.controller('loginCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
	
  }]);

