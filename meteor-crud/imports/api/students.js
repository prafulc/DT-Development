  Meteor.publish('students.list', function studentPublication() {

    return Students.find();

  });

Students.allow({
  'insert': function () {
    // add custom authentication code here
    return true;
  },
  'update': function(){
  	return true;
  },
  'remove': function(){
  	return true;
  }
});