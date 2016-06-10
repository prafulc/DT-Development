import './users.html';
//import '../../../both/collections/students.js';
//import '../../api/students.js';
Meteor.subscribe('users.list');

Template.users.onRendered(function(){

});

Template.users.events({
	
});

Template.users.helpers({
	userlist(){
		console.log("Fetched user list is ------>", Meteor.users.find());
		return Meteor.users.find();
	}
	/*loggedInUser: function() {
		return Meteor.user();
		//console.log(Meteor.user().emails[0].address);
	},
	useremail: function(){
		return Meteor.user().emails[0].address;
	}*/
});