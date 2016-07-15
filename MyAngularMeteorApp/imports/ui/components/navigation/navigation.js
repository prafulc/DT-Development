import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './navigation.html';
import uiRouter from 'angular-ui-router';
//import hometemplate from '../myHome.html';

class navigationController{
	constructor($scope){
		$scope.viewModel(this);

		//helpers
		this.helpers({
			currentUser(){
				return Meteor.user();
			}
		});	
	}

	userLogin(userCredentials){
		console.log("> user credentials are ---->", userCredentials);
		Meteor.loginWithPassword(userCredentials.email, userCredentials.password, function(error, result){
			if(error){
				console.log("> Getting error in Meteor login.", error);
				throw error;
			}else{
				console.log("> User logged in successfully.", result);
			}
		});
		/*this.userCredentials.email = '';
		this.userCredentials.password = '';*/
	}

	userLogout(){
		Meteor.logout();
		console.log("> User successfully logged out.");
	}
}
export default angular.module('global-navigation-bar',[
	angularMeteor
])
.component(
	'navigation',
	{
		templateUrl: template,
		controller: ['$scope', navigationController]
	}
)

/*
.component(
	'myHome',
	{
		templateUrl: hometemplate,
		controller: ['$scope', myHomeController]
	}
);*/