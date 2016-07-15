import angular from 'angular';
import angularMeteor from 'angular-meteor';
import homeTemplate from './myHome.html';
import uiRouter from 'angular-ui-router';
//import { Registration } from './registration/registration';
import UserRegistration from './registration/registration';
import Games from './games/games';

class myHomeController{
	constructor($scope){
		$scope.viewModel(this);
	
		this.stations = [
			{
				name: 'Lucknow Jn.',
				description: 'lkoko jn desc..',
				location:  'UP'
			},
			{
				name: 'Delhi Jn.',
				description: 'delhijn some desc..',
				location: 'Delhi'
			},
			{
				name: 'Mumbai Jn.',
				description: 'mumbai jn some desc..',
				location: 'Maharastra'
			}
		];
	}
}

export default angular.module('myHome',[
	angularMeteor,
	uiRouter,
	UserRegistration.name,
	Games.name
])

.component(
	'myHome',
	{
		templateUrl: 'imports/ui/components/myHome.html',
		controller: ['$scope', myHomeController]
	}
).config(config);

function config($locationProvider, $urlRouterProvider, $stateProvider) {
  	'ngInject';
  	$locationProvider.html5Mode(true);
/* 	$stateProvider
  
    .state('registration', {
      url: '/user-registration',
      templateUrl: 'imports/ui/components/registration/registration.html',
      controller: ['$scope', UserRegistration]
    }) */

    /*.state('page-not-found', {
      url: '/page-not-found',
      templateUrl: 'imports/ui/components/page-not-found/page-not-found.html'
    })*/
	$stateProvider
		.state('home', {
	      url: '/',
	      //templateUrl: 'imports/ui/components/myHome.html',
	      controller: ['$scope', myHomeController]
	    }) 

 	$urlRouterProvider.otherwise('/');
}
