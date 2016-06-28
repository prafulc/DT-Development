Meteor.publish('gamesAddedByCurrentUser', function() {
  return Games.find({
    owner: this.userId
  });
});