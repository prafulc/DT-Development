import angular from 'angular';
import angularMeteor from 'angular-meteor';
import forgotPasswordTemplate from './forgotPassword.html';
import uiRouter from 'angular-ui-router';

const name="forgotPasswordCtrl";

export default angular.module(name,[
	angularMeteor, 
	uiRouter
])
.controller('forgotPasswordCtrl', ['$scope', '$reactive', '$stateParams', '$timeout', '$meteor', function($scope, $reactive, $stateParams, $timeout, $meteor) {
	$scope.viewModel(this);
	//$reactive(this).attach($scope);
    
	$scope.sendRecoveryMail = function(userEmail){
		console.log("> forgot password >: ", userEmail);
		$meteor.forgotPassword({email: userEmail}).then(function(){
		    console.log('Success sending forgot password email');
		}, function(err){
		    console.log('Error sending forgot password email - ', err);
		});
		this.gameDetails = '';
	}

}])
.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider)
{
	$locationProvider.html5Mode(true);

	$stateProvider
	    .state('forgot-password', {
	      url: '/forgot-password',
	      controller:'forgotPasswordCtrl',
	      templateUrl: forgotPasswordTemplate
		})
}
])	