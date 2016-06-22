import '../imports/collections/reg_users.js';

import '../imports/collections/images.js';

import '../imports/collections/Emails.js';

Meteor.startup(function () {
  smtp = {
    username: 'rajit.deligence@gmail.com',   // eg: server@gentlenode.com
    password: 'william123A@',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.gmail.com',  // eg: mail.gandi.net
    port: 465
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
});

/*Meteor.startup( function() {
  process.env.MAIL_URL = "smtp://postmaster%40sandbox856e4efc82814ecab3736cccb9f2d6b5.mailgun.org:6431f66f43707699ee4e84ae395e40cd@smtp.mailgun.org:587";
});*/

Accounts.config({
	sendVerificationEmail: true,
	forbidClientAccountCreation: false
});

Accounts.onCreateUser(function(options, user) {
    user['subscribe'] = options.subscribe
    user['personal_detail'] = options.personal_detail
    user['fileId'] = options.fileId
    user['createdAt'] = options.createdAt
    user['profile'] = options.profile
    return user
})

// Validate username, sending a specific error message on failure.
/*Accounts.validateNewUser(function (user) {
  if(!user.subscribe){
  	throw new Meteor.Error(403, "must have subscribe");		
  }


  if (user.password && user.password.length >= 6){
    return true;
  }else{
  throw new Meteor.Error(403, "Password must have at least 6 characters");
  }


  if (user.username && user.username.length >= 3){
    return true;
  }else{
  throw new Meteor.Error(403, "Username must have at least 3 characters");
  }
});

*/