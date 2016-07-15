import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './page-not-found.html';
import uiRouter from 'angular-ui-router';
//import hometemplate from '../myHome.html';

class pageNotFoundController{
	constructor($scope){
		$scope.viewModel(this);


		//helpers
		this.helpers({
			currentUser(){
				return Meteor.user();
			}
		});

	}
}
export default angular.module('page-not-found',[
	angularMeteor
])
.component(
	'page-not-found',
	{
		templateUrl: template,
		controller: ['$scope', pageNotFoundController]
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