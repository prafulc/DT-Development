import angular from 'angular';
import angularMeteor from 'angular-meteor';
import registrationTemplate from './registration.html';
import uiRouter from 'angular-ui-router';

const name = 'user-registration';

export default angular.module('user-registration',[
	angularMeteor, 
	uiRouter
])
.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider){
	$locationProvider.html5Mode(true);

	$stateProvider
	    .state('registration', {
	      url: '/registration',
	      templateUrl: registrationTemplate,
	      controller:'registrationCtrl'
		})
  	$urlRouterProvider.otherwise('/');
}])

.controller('registrationCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
	$scope.test = function(){
		alert("Hii ==<>");
	}

	/*$scope.constructor = function($scope){
		console.log("Working fine..");
		
		$scope.viewModel(this);

		this.credentials = {
      	  	email: '',
	      	password: '',
	        fullname: '',
			gender: '',
			contact: ''
	    };



	    this.error = '';
		//helpers
		this.helpers({
			currentUser(){
				return Meteor.user();
			}
		});
	}*/


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
		          //this.$state.go('parties');
		        }
		    })
	    );	
	  	this.userDetails = '';  
	}

}]);
