Meteor.methods({
	fetchGameList: function(){
		//console.log("Current user name is "+ Meteor.userId());

		var gameList = Games.find({owner: Meteor.userId()}).fetch();
		//console.log("Game List is ---->", gameList);
		return gameList;
	}
});