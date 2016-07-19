import angular from 'angular';
import angularMeteor from 'angular-meteor';
import changePasswordTemplate from './changePassword.html';
//import { Games } from '../../../api/games.js'; 
//import updateGame from './updateGame';
import uiRouter from 'angular-ui-router';

const name="changePasswordCtrl";

export default angular.module(name,[
	angularMeteor, 
	uiRouter
])
.controller('changePasswordCtrl', ['$scope', '$reactive', '$stateParams', '$timeout', '$state', '$meteor', function($scope, $reactive, $stateParams, $timeout, $state, $meteor) {
	$scope.viewModel(this);
	//$reactive(this).attach($scope);
	this.subscribe('games');
	
	$scope.helpers({
        currentUser(){
        	//console.log("Current User Is : ",Meteor.user());
        	return Meteor.user();
        }
    });
    
	$scope.changePassword = function(credentials){
		//console.log("> change password >old: ", credentials.oldPassword," >new:",credentials.newPassword);
		$meteor.changePassword(credentials.oldPassword, credentials.newPassword, function (error){
			if(error){
				console.log("Getting error while trying to change username password.");
				throw error;
			}else{
				console.log("> Password Changed !");
				$state.go('home');
			}
		});
	}

}])
.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider)
{
	$locationProvider.html5Mode(true);

	$stateProvider
	    .state('change-password', {
	      url: '/change-password',
	      controller:'changePasswordCtrl',
	      templateUrl: changePasswordTemplate
		})
}
])	