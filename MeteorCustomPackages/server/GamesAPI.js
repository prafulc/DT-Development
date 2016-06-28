if(Meteor.isServer){
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
				code = 200;
				status = "Success";
				result = gameList;	
			}else{
				code = 204;
				status = "Success";
				result = "No record found..!";
			}

			return {
				statusCode: code,
				body: {status: status, data: result }
			}; 
		}
	});

	/*domain/games-api/v1/game/xnSgn63kf9EwqwSJX*/
	API.addRoute('game/:id', {authRequired: false}, {
		get: function(){
			const game = Games.findOne({_id: this.urlParams.id});
			//console.log("game details are ---> ", game);
			
			const response = "";
			if(game){
				code = 200;
				status = "Success";
				result = game;
			}
			else{
				code = 404;
				status = "Failed";
				result = "No Record Found..!";
			}

			return {
	          statusCode: code,
	          body: { status: status, data: result }
	        };
		},

		delete: function(){
			roleRequired: ['author', 'admin'];
	      	
	        if(Games.remove(this.urlParams.id)) {
        	  	code = 200;
        	  	status = "Success";
        	  	result = "Record deleted successfully..!";
	        }else{
	        	code = 403;
        	  	status = "Failed";
        	  	result = "Forbidden..!";
	        }

	      	return {
		        statusCode: code,
		        body: { status: status, data: result }
		    };
		},
	});
}