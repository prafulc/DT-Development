import angular from 'angular';
import angularMeteor from 'angular-meteor';
import registrationTemplate from './registration.html';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';

const name = 'user-registration';

export default angular.module('user-registration',[
	angularMeteor, 
	uiRouter
])
.controller('registrationCtrl', ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state) {
	$scope.test = function(){
		alert("Hii ==<>");
	}

	$scope.createUser = function(userDetails){
		console.log("Form submitted. credentials are: --->", userDetails);

		Accounts.createUser(
		{
			email: userDetails.email,
            password: userDetails.password,
            username: userDetails.email,
            profile:{ 
            	fullname: userDetails.fullname,
        		gender: userDetails.gender,
        		contact: userDetails.contact
        	}    
		},
	    this.$bindToContext((err) => {
	        if (err) {
	     	  console.log("got error in createUser", err);	
	          this.error = err;
	        } else {	 	
	          console.log("user created..!!");
	          Meteor.call('sendSuccessMail', Meteor.user().emails[0].address, function (error, result){
	          	if(error){
	          		console.log("> Error: Invalid email address. ", error);
	          		$state.go('home');
	          	}else{
	          		console.log("> Mail Sent");
	          		$state.go('home');
	          	}
	          });
	          //$scope.sendSuccessMail(Meteor.user().emails[0].address);
	          //this.$state.go('parties');
	        }
	    }));	
	  	this.userDetails = '';  
	}

}])
.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider){
	$locationProvider.html5Mode(true);

	$stateProvider
	    .state('registration', {
	      url: '/registration',
	      templateUrl: registrationTemplate,
	      controller:'registrationCtrl',
	      resolve: {
		    currentUser($q) {
		        if (Meteor.userId() === null) {
		          return $q.resolve();
		        } else {
		          return $q.reject('AUTH_REQUIRED');
		        }
		    }
		  }
		})
  	$urlRouterProvider.otherwise('/');
}])