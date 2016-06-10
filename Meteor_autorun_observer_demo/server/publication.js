Meteor.publish('studentRecord', function() {
  return Student.find();
});