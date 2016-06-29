if(Meteor.isServer){
	var pageSession = new ReactiveDict();
	//Items = new Mongo.Collection('items');
	//Articles = new Mongo.Collection('articles');

	
	const API = new Restivus({
		useDefaultAuth: true,
	    prettyJson: true,
	    apiPath: 'games-api/',
	    version: 'v1'	
	});

  	//API.addCollection(Items);
	
	API.addCollection(Meteor.users, {
	    excludedEndpoints: ['getAll', 'put'],
	    routeOptions: {
	      authRequired: true
	    },
	    endpoints: {
	      post: {
	        authRequired: false
	      },
	      delete: {
	        roleRequired: 'admin'
	      }
	    }
	});

	/*domain/games-api/v1/games*/
	API.addRoute('games', {authRequired: false}, {
		get: function(){
			const gameList = Games.find({}).fetch();
			//console.log("game list is --->",gameList );
			if(gameList){
				var response = {
						statusCode : 200,
						body:{
							status : "Success",
							data : gameList
						}
					};
			}else{
				var response = {
						statusCode : 204,
						body:{
							status : "Success",
							data : "No record found..!"
						}
					};
			}

   			return response;
		}
	});

	/*domain/games-api/v1/game/xnSgn63kf9EwqwSJX*/
	API.addRoute('game/:id', {authRequired: false}, {
		get: function(){
			const game = Games.findOne({_id: this.urlParams.id});
			
			if(game){
				var response = {
						statusCode : 200,
						body:{
							status : "Success",
							data : game
						}
					};
			}
			else{
				var response = {
						statusCode : 404,
						body:{
							status : "Failed",
							data : "No Record Found..!"
						}
					};
			}

   			return response;
		},

		delete: function(){
			roleRequired: ['author', 'admin'];
	        if(Games.remove(this.urlParams.id)) {
	        	var response = {
						statusCode : 200,
						body:{
							status : "Success",
							data : "Record deleted successfully..!"
						}
					};

	        }else{
	        	var response = {
	   					statusCode : 405,
	   					body:{
	   						status : "Failed",
	   						data : "Forbidden: Can not delete this record"
	   					}
   					};

	        }

   			return response;
		},

		put: function(){
			//console.log("put: parameters are --->>", this.bodyParams);
			//console.log("Game id is --->",this.urlParams.id );
			Games.update(
				{'_id': this.urlParams.id}, 
				{
					$set:{
						'name': this.bodyParams.name,
						'description': this.bodyParams.description,			
						'category': this.bodyParams.category
					}
				},
				function(error){
					if(error){
						console.log("Getting error in gameAPI put.", error.message);

						var response = {
		   					statusCode : 405,
		   					body:{
		   						status : "Failed",
		   						data : error.message
		   					}
	   					};
	   					pageSession.set('finalResponse', response);
					}else{
						var response = {
		   					statusCode : 200,
		   					body:{
		   						status : "Success",
		   						data : "Record updated successfully..!"
		   					}
	   					};
	   					pageSession.set('finalResponse', response);
					}
				}
			);
   			return pageSession.get('finalResponse');
		}
	});

	pageSession.set("testVariable", "working");
/*	Admin - ac@gmail.com
	id - Bnm84KKzBHXRJWPng*/
	/*domain/games-api/v1/addgame*/
	API.addRoute('addgame', {authRequired:false},{
		/*post is not working for now;; showing some error related to Meteor.userId*/

		 post: function(){

   			Games.insert({
   				"name": this.bodyParams.name,
   				"description": this.bodyParams.description,
   				"createdAt": this.bodyParams.createAt,
   				"updatedAt": this.bodyParams.updatedAt,
   				"category": this.bodyParams.category,
   				"picture": this.bodyParams.picture,
   				"owner": this.bodyParams.owner
   			}, function (error, result){
   				if(error){
   					var response = {
	   					statusCode : 405,
	   					body:{
	   						status : "Failed",
	   						data : error.message
	   					}
   					};
   					pageSession.set('finalResponse', response);
   				}else{
   					var response = {
	   					statusCode : 200,
	   					body: { Status : "Success", Message:"Record inserted successfully", Data: result }
   					};
   					pageSession.set("finalResponse", response);
   				}
   			});
   			return pageSession.get('finalResponse');
   			
	    }
	});


}