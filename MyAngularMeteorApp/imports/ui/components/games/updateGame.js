import angular from 'angular';
import angularMeteor from 'angular-meteor';
import updateGameTemplate from './updateGame.html';
import { Games } from '../../../api/games.js';
import uiRouter from 'angular-ui-router';


export default angular.module(name,[
	angularMeteor, 
	uiRouter
])
.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider)
{
	$locationProvider.html5Mode(true);

	$stateProvider
	    .state('updateGame', {
	      url: '/updateGame/:gameId',
	      controller:'updateGameCtrl',
	      templateUrl: updateGameTemplate
		})
}
])
.controller('updateGameCtrl', ['$scope', '$reactive', '$stateParams', '$timeout', function($scope, $reactive, $stateParams, $timeout) {
	$scope.viewModel(this);
	//$reactive(this).attach($scope);
	this.subscribe('games');
	$scope.helpers({
        game(){
			var result = Games.find({_id: $stateParams.gameId}).fetch();
        	console.log("Result is -->", result);
        	//$scope.gameDetails.name = result[0].name;
        	return result;
        }
    });

	$scope.updateGame = function(gameId){
		console.log("> updateGame action.", gameId);
		/*Games.update(gameDetails, function (error,result){
			if(error){
				console.log("Getting error in update game.", error);
				throw error;
			}else{
				console.log("Game updated successfylly.", result);
			}
		});*/
		this.gameId = '';
	}
}])	