import angular from 'angular';
import angularMeteor from 'angular-meteor';
import gameTemplate from './games.html';
import { Games } from '../../../api/games.js'; 
import updateGame from './updateGame';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import { Counts } from 'meteor/tmeasday:publish-counts';

const name = 'games';

export default angular.module(name,[
	angularMeteor, 
	uiRouter,
	updateGame.name,
	utilsPagination
])
.controller('gameCtrl', ['$scope', '$stateParams','$reactive', '$timeout', '$meteor', function($scope, $stateParams, $reactive, $timeout, $meteor) {

	$scope.viewModel(this);
	$reactive(this).attach($scope);
	
	$scope.perPage = 3;
    $scope.page = 1;
    $scope.sort = {
      name: 1
    };
    $scope.searchString = '';
    $scope.orderProperty = '1';

	$meteor.autorun($scope, function(){
		console.log("----Meteor autorun----");

		$meteor.subscribe('games', {
			limit: parseInt($scope.getReactively('perPage')), 
			skip: parseInt(($scope.getReactively('page')-1)*($scope.getReactively('perPage'))), 
			sort: $scope.getReactively('sort')
		}, $scope.getReactively('searchString')).then(function(){
			$scope.gamesCount = $meteor.object(Counts, 'numberOfGames', false);
			console.log("Games Count = ",$scope.gamesCount );				
		});	
	})

	$scope.pageChanged = function(newPage){
		console.log(">pageChanged(new page number is = "+newPage+")")
		$scope.page = newPage;
	}


	$scope.$watch('orderProperty', function(){
		if($scope.orderProperty){
			$scope.sort = {name: parseInt($scope.orderProperty)};
		}
	});
	
	$scope.helpers({
        games(){
        	//return Games.find({}).fetch();
        	console.log("> Games with sorting : : ",Games.find({}, {
	          sort : this.getReactively('sort')
	        }).fetch());

        	return Games.find({}, {
	          	sort : $scope.getReactively('sort')
	        }).fetch();
        },
      	gamesCount() {
        	return Counts.get('numberOfGames');
      	}
    });
    	
	/****/
	/*FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        $scope.profilePic = "/cfs/files/images/" + fileObj._id;
      });
    });*/
	/****/
	$scope.uploadFile = function(event){
		console.log(">upload File function.");
        alert(">><<");
        var files = event.target.files;

        /*for (var i = 0, ln = files.length; i < ln; i++) {

            files[i].userId = Meteor.userId();

            Images.insert(files[i], function (err, fileObj) {

            });
        }*/
    };
	
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