import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './navigation.html';
import uiRouter from 'angular-ui-router';
import Users from '../../../api/users.js'; 

//import hometemplate from '../myHome.html';

class navigationController{
	
	constructor($scope){

		$scope.viewModel(this);
		Meteor.subscribe('currentUserInfo');
		console.log(">navigation")
		
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

	facebookLogin(){
		console.log("Facebook Login Action.");
		Meteor.loginWithFacebook({requestPermissions: ['email', 'public_profile', 'user_friends', 'user_likes']}, 
		function(err){
            if (err) {
            	console.log("Error: Facebook Login Error.");
                throw new Meteor.Error("Facebook login failed");
            }
        });
	}

	userLogout(){
		Meteor.logout(function(){
			console.log("> Successfully logged out..!");
		}, function (error){
			console.log(">Error: Can't logout..!", error);
		});
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