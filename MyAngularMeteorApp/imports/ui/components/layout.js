import angular from 'angular';
import angularMeteor from 'angular-meteor';
import layoutTemplate from './layout.html';
//import { Games } from '../../../api/games.js'; 
//import updateGame from './updateGame';
import uiRouter from 'angular-ui-router';
import myHome from './myHome';

const name = 'layoutCtrl';


export default angular.module(name,[
	angularMeteor, 
	uiRouter,
	myHome.name
])
.controller('layoutCtrl', ['$scope', '$stateParams','$reactive', '$timeout', function($scope, $stateParams, $reactive, $timeout) {
	$scope.viewModel(this);
	//$reactive(this).attach($scope);
	console.log(">layout");	

    
}])
.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider)
{
	$locationProvider.html5Mode(true);

	$stateProvider
	    .state('layout', {
	      url: '/',
	      controller:'layoutCtrl',
	      templateUrl: layoutTemplate
		})

 	$urlRouterProvider.otherwise('/home');
}
])	