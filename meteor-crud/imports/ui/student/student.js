import './student.html';
//import '../../../both/collections/students.js';
//import '../../api/students.js';
Meteor.subscribe('students.list');

Template.student.onRendered(function(){

});

Template.student.events({
	
});

Template.student.helpers({
	students(){
		return Students.find();
	}
	/*loggedInUser: function() {
		return Meteor.user();
		//console.log(Meteor.user().emails[0].address);
	},
	useremail: function(){
		return Meteor.user().emails[0].address;
	}*/
});