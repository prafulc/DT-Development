import './updateuser.html';
//import '../../../both/collections/students.js';
//import '../../api/students.js';
Meteor.subscribe('users.list');

Template.updateuser.onRendered(function(){

});

Template.updateuser.events({
	'submit': function(events, template){
		events.preventDefault();
		if($('#usercamefrom').val()=="facebook"){
			//console.log("Facebook user");
			Meteor.users.update(
				$('#userid').val(), 
				{
					$set: {
						'services.facebook.name': $('#NameField').val(),
						'services.facebook.email': $('#EmailField').val(),
						'services.facebook.gender': $('#GenderField').val()
					}
				}, 
				function (error){
					console.log("---->",error);
				}
			);

		}else{
			//console.log("Genuine user");
			Meteor.users.update($('#userid').val(), 
				{				
					$set: {
						'username': $('#NameField').val(),
						'emails.[0].address': $('#EmailField').val(),
						'profile.contact': $('#MobileField').val()
					}
				}, function (error){
					console.log("---->",error);
				}
			);
		}
	}	
});

Template.updateuser.helpers({

	userdetails(){
		console.log("selected user----> ", Meteor.users.findOne(FlowRouter.getParam("id")));
		return Meteor.users.findOne(FlowRouter.getParam("id"));
	}
});