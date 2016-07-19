import angular from 'angular';
import angularMeteor from 'angular-meteor';
import gameTemplate from './games.html';
import { Games } from '../../../api/games.js'; 
import updateGame from './updateGame';
import uiRouter from 'angular-ui-router';

const name = 'games';


export default angular.module(name,[
	angularMeteor, 
	uiRouter,
	updateGame.name
])
.controller('gameCtrl', ['$scope', '$stateParams','$reactive', '$timeout', function($scope, $stateParams, $reactive, $timeout) {
	$scope.viewModel(this);
	//$reactive(this).attach($scope);
	this.subscribe('games');
	
	$scope.helpers({
        games(){
        	return Games.find({}).fetch();
        }
    });
    
	$scope.addGame = function(gameDetails){
		console.log("> form submitted. ", gameDetails);
		Games.insert(gameDetails, function (error,result){
			if(error){
				console.log("Getting error in add game.", error);
				throw error;
			}else{
				console.log("Game added successfylly.", result);
			}
		});
		this.gameDetails = '';
	}

	$scope.updateGame = function(gameId){
		console.log("> updateGame action. ", gameId);
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

	$scope.deleteGame = function(gameId){
		console.log("> deleteGame action. ", gameId);
		Games.remove({_id: gameId}, function (error,result){
			if(error){
				console.log("Getting error in delete game.", error);
				throw error;
			}else{
				console.log("Game deleted successfylly.", result);
			}
		});
		this.gameId = '';
	}
}])
.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider)
{
	$locationProvider.html5Mode(true);

	$stateProvider
	    .state('games', {
	      url: '/games',
	      controller:'gameCtrl',
	      templateUrl: gameTemplate,
	      cache: false
		})
}
])	