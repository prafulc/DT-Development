import angular from 'angular';
import angularMeteor from 'angular-meteor';
import bikeTemplate from './bikes.html';
import { Bikes } from '../../../api/bikes.js'; 
//import updateGame from './updateGame';
import uiRouter from 'angular-ui-router';

const name="bikeCtrl";

export default angular.module(name,[
	angularMeteor, 
	uiRouter
])
.controller('bikeCtrl', ['$scope', '$reactive', '$stateParams', '$timeout', function($scope, $reactive, $stateParams, $timeout) {
	$scope.viewModel(this);
	//$reactive(this).attach($scope);
	this.subscribe('bikes');
	
		var vm = this;

		vm.user = {};

		// note, these field types will need to be
		  // pre-defined. See the pre-built and custom templates
		  // http://docs.angular-formly.com/v6.4.0/docs/custom-templates
		vm.userFields = [
		    {
		      key: 'email',
		      type: 'input',
		      templateOptions: {
		        type: 'email',
		        label: 'Email address',
		        placeholder: 'Enter email'
		      }
		    },
		    {
		      key: 'password',
		      type: 'input',
		      templateOptions: {
		        type: 'password',
		        label: 'Password',
		        placeholder: 'Password'
		      }
		    },
		    {
		      key: 'file',
		      type: 'file',
		      templateOptions: {
		        label: 'File input',
		        description: 'Example block-level help text here',
		        url: 'https://example.com/upload'
		      }
		    },
		    {
		      key: 'checked',
		      type: 'checkbox',
		      templateOptions: {
		        label: 'Check me out'
		      }
		    }
		];

	$scope.helpers({
		  
        
        bikes(){
        	return Bikes.find({}).fetch();
        }
    });
    
}])
.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider)
{
	$locationProvider.html5Mode(true);

	$stateProvider
	    .state('bikes', {
	      url: '/bikes',
	      controller:'bikeCtrl',
	      templateUrl: bikeTemplate,
	      cache: false
		})
}
])	