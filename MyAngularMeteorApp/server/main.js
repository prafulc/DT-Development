import { Meteor } from 'meteor/meteor';
import '../imports/api/games.js';
import '../imports/api/users.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
	sendSuccessMail:function(toEmailAddress){
		Email.send({
			from: "support@deligence.com",
			to: toEmailAddress,
			subject: "MyAngularMeteorApp - User registered successfully. ",
			text: "Hello, You are successfully registered with your email address "+toEmailAddress+"."
		});
		console.log("-> Mail send!");
	}
})
