import './signin.html';
import '../../api/common.js';
import '../../api/useraccounts.js';

Template.signin.onRendered(function(){

});

Template.signin.events({

	//For facebook login
	'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
    },
    //For facebook login
	

	'change .profilepic': function(event, template) {
	    FS.Utility.eachFile(event, function(file) {
	      Images.insert(file, function (err, fileObj) {
	        profilePic = "/cfs/files/images/" + fileObj._id;
	      });
	    });
	  },


	'submit': function(event, template){
		event.preventDefault();

		/*const data = {
			username: $('[name=username]').val(),
			email: $('[name=email]').val(),
			password: $('[name=password]').val(),
			age: $('[name=age]').val(),
			mobile: $('[name=contact]').val(),
			profilepic: profilePic
		};*/
        email= $('[name=email]').val();
        password= $('[name=password]').val();

        Meteor.loginWithPassword(email, password, function(error){
            if(error){
                console.log("Login error is "+error);
            }else{
                console.log("Successfully logged-in");
                FlowRouter.go('/');
            }
        });

	}
});

Template.signin.helpers({
	/*loggedInUser: function() {
		return Meteor.user();
		//console.log(Meteor.user().emails[0].address);
	},
	useremail: function(){
		return Meteor.user().emails[0].address;
	}*/
});