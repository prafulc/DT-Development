Games.allow({
  insert: function(userId, doc) {
    return (userId === doc.owner);
  },
  remove: function(userId, doc) {
    return (userId === doc.owner);
  }
});
/*Error: A method named '/games/insert' is already defined*/