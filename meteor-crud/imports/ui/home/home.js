import './home.html';

Meteor.subscribe('user.current');

Template.home.onRendered(function(){

});

Template.home.events({

});

Template.home.helpers({

	/*loggedInUser: function() {
		console.log(Meteor.user());
		return Meteor.user();
	}*/
	/*useremail: function(){
		return Meteor.user().emails[0].address;
	}*/
});