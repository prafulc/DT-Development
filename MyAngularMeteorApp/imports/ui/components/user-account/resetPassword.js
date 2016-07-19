import angular from 'angular';
import angularMeteor from 'angular-meteor';
import resetPasswordTemplate from './resetPassword.html';
import uiRouter from 'angular-ui-router';

const name = "resetPasswordCtrl";
//http://localhost:3000/#/reset-password/_xkCteXjiI_2HKSufrO3vEqIjeXYodhze8jWKCxQyiw
export default angular.module(name,[
	angularMeteor, 
	uiRouter
])
.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider)
{
	$locationProvider.html5Mode(true);

	$stateProvider
	    .state('reset-password', {
	      url: '/reset-password/:token',
	      controller:'resetPasswordCtrl',
	      templateUrl: resetPasswordTemplate
		})
}
])
.controller('resetPasswordCtrl', ['$scope', '$reactive', '$stateParams', '$timeout', '$meteor', '$state', function($scope, $reactive, $stateParams, $timeout, $meteor, $state) {

	$scope.viewModel(this);
	//$reactive(this).attach($scope);
	console.log("> Token value is ->",$stateParams.token);
	$scope.helpers({
        currentUser(){
        	console.log("Current User Is : ",Meteor.user());
        	return Meteor.user();
        }
    });
    
	$scope.resetPassword = function(userDetails){
		console.log("> forgot password >: ", userDetails);

		$meteor.resetPassword($stateParams.token, userDetails.newPassword).then(function(){
				console.log('Reset password success');
				$state.go('home');
		  	}, function(err){
		    	console.log('Error resetting password - ', err);
		  	});
	}

}])	