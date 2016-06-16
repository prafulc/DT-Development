Meteor.subscribe('games.list');

Template.games.helpers({
	gamelist(){

		var query = Games.find();
		

		Tracker.autorun(function () {
		  var best = _.max(Games.find().fetch(), function (game) {
		    return game.rating;
		  });
		  
		  if (best)
		    Session.set("bestGame", best.name);
		});

		console.log("Best Game is = "+Session.get('bestGame'));


		query.observeChanges({
	        
	        added: function(id, fields) {
	          console.log('DOC INSERTED. Id is = '+id+' & Fields are = '+fields);
	        },
	        
	        changed: function(id, fields) {
	          console.log('DOC UPDATED. Id is = '+id+' & Fields are = '+fields);
	        },
	        
	        removed: function(id, fields) {
	          console.log('DOC REMOVED. Id is = '+id+' & Fields are = '+fields);
	        }
	     });

		return query;
	}
});

Template.games.events({

});