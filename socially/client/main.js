import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Parties } from '../imports/collections/parties.js';
 
const socialApp = angular.module('socially', [
  angularMeteor,
  uiRouter
])

socialApp.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider){
	$locationProvider.html5Mode(true);

	 $stateProvider
	    .state('parties', {
	      url: '/parties',
	      templateUrl: 'client/parties-list.ng.html',
	      controller:'PartiesListCtrl'
	    })

    	.state('partyDetails', {
		    url: '/parties/:partyId',
		    templateUrl: 'client/parties-details.ng.html',
	      controller:'PartyDetailsCtrl'
  		});
 
  $urlRouterProvider.otherwise('/parties');
}])


socialApp.controller('PartiesListCtrl', ['$scope', '$meteor', function($scope, $meteor) {
   $scope.parties = $meteor.collection(Parties, false);

    $scope.remove = function(party){
		// $scope.parties.remove(party);
		delete $scope.parties.pop(0);  //delteing zeroth record, just for checking , actually this is wrong.
    }

    $scope.removeAll = function(){
    	// $scope.parties.remove();
    	delete $scope.parties;
    }
  }]);

socialApp.controller('PartyDetailsCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
	$scope.partyId = $stateParams.partyId
  }]);

