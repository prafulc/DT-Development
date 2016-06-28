Template.registerHelper('gamesAddedByCurrentUser', function (template){

	Meteor.call('fetchGameList', function (error, result){
		if(error){
			console.log("Getting error in fetching Game List.",error);
			throw error;
		}else{
			console.log("Games added by current user are ----->", result);
			Session.set('gameListByCurrentUser', result);
		}
	});
	return Session.get('gameListByCurrentUser');

});