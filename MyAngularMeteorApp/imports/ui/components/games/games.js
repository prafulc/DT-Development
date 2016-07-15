import angular from 'angular';
import angularMeteor from 'angular-meteor';
import gameTemplate from './games.html';
import { Games } from '../../../api/games.js'; 

import uiRouter from 'angular-ui-router';

const name = 'games';

Meteor.subscribe('games');
export default angular.module(name,[
	angularMeteor, 
	uiRouter
])
.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider)
{
	$locationProvider.html5Mode(true);

	$stateProvider
	    .state('games', {
	      url: '/games',
	      templateUrl: gameTemplate,
	      controller:'gameCtrl',
	      cache: false
		})
}
])

.controller('gameCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {

	//console.log(">games: ",Games.find({}));
	/*(function initController() {
        // reset login status
		$scope.games =  Games.find({}).fetch();
    })();*/

	/*Games.find( {}, function (err, result){
		console.log("Error", err , result);
		if(!err){
			console.log(" ->",result);	
		}
	})*/
/*
$scope.getCurrentUserFriends = function(){
        Meteor.subscribe('friends');
        $scope.myFriends = Friends.find({"userId":currentUserId}).fetch()
     }

    $scope.getCurrentUserFriends()*/

	$scope.getGames = function (){
		$scope.games = Games.find({}).fetch();
		console.log("game list-->" , $scope.games);
	}
	$scope.getGames()
	/*
	$scope.games = Games.find({}).fetch();
	console.log("Game list is --->",Games.find({}).fetch());*/
	$scope.addGame = function(gameDetails){
		console.log("> Games find = ", Games.find({}).fetch());
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
}])	