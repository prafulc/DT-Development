Student = new Meteor.Collection('student');

Students = new SimpleSchema({
  	firstname: {
    	type: String,
    	max: 50
  	},
  	lastname: {
    	type: String,
    	max: 50
  	},
  	email: {
    	type: String,
    	max: 50
  	},
  	Address: {
    	type: String,
    	max: 50
  	}
});

Student.attachSchema(Students);