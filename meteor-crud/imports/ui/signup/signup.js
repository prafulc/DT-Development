import './signup.html';
import '../../api/common.js';
import '../../api/useraccounts.js';


Template.signup.onRendered(function(){

});

Template.signup.events({

	'change .profilepic': function(event, template) {
	    FS.Utility.eachFile(event, function(file) {
	      Images.insert(file, function (err, fileObj) {
	        profilePic = "/cfs/files/images/" + fileObj._id;
	      });
	    });
	  },

	'submit': function(event, template){
		event.preventDefault();
        data = {
            username: $('[name=username]').val(),
            email: $('#EmailField').val(),//$('[name=email]').val(),
            password: $('#PasswordField').val(),//$('[name=password]').val(),
            age: $('[name=age]').val(),
            mobile: $('[name=contact]').val(),
            profilepic: profilePic
        };
        console.log("--->data is ", data);
		/*const data = {
			username: $('[name=username]').val(),
			email: $('[name=email]').val(),
			password: $('[name=password]').val(),
			age: $('[name=age]').val(),
			mobile: $('[name=contact]').val(),
			profilepic: profilePic
		};*/
        console.log("Profile pic is --------->", profilePic);

		Accounts.createUser({
            email: $('#EmailField').val(),
            password: $('#PasswordField').val(),
            username: $('[name=username]').val(),
            profile:{ 
            		age: $('[name=age]').val(), 
            		profilepic: profilePic, 
            		contact: $('[name=contact]').val()
            	}
        }, function (error){
            if(error){
                console.log("Getting Error.."+error.reason);    
                if(error.reason=="Email already exists."){
                    console.log("Error 1 ! ", error.reason);
                }
                else if(error.reason=="Username already exists."){
                    console.log("Error 2! ", error.reason);
                }
                else{
                    console.log("Error 3! ", error.reason);
                }
            }
            else{
            	console.log("User registered successfully::", Meteor.user());
                FlowRouter.go('/');              
            }
        });
		//console.log("-------> ", data); 
		/*Meteor.call('useraccount.insert', data);*/
	}
});

Template.signup.helpers({
	/*loggedInUser: function() {
		return Meteor.user();
		//console.log(Meteor.user().emails[0].address);
	},
	useremail: function(){
		return Meteor.user().emails[0].address;
	}*/
});