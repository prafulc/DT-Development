import angular from 'angular';
import angularMeteor from 'angular-meteor';
import homeTemplate from './myHome.html';
import uiRouter from 'angular-ui-router';


class myHomeController{
	constructor($scope){
		$scope.viewModel(this);
		console.log(">home");
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

	areWeAtHome(){
		return true;
	}

}

export default angular.module('myHome',[
	angularMeteor,
	uiRouter,
])

.component(
	'myHome',
	{
		templateUrl: 'imports/ui/components/myHome.html',
		controller: ['$scope', myHomeController]
	}
).config(config).run(run);

function config($locationProvider, $urlRouterProvider, $stateProvider) {
  	'ngInject';
  	$locationProvider.html5Mode(true);

	$stateProvider
		.state('home', {
	      url: '/',
	      //templateUrl: 'imports/ui/components/myHome.html',
	      controller: ['$scope', myHomeController]
	    }) 


 	$urlRouterProvider.otherwise('/');
}

function run($rootScope, $state) {
  'ngInject';
 
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error)
  	{
      if (error === 'AUTH_REQUIRED') {
        $state.go('home');
      }
    }
  );
}
