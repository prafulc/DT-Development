Meteor.publish('games.list', function(){
	return Games.find();
});