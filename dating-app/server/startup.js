import '../imports/collections/reg_users.js';

import '../imports/collections/images.js';

import '../imports/collections/Emails.js';

import '../imports/collections/friends.js';

Meteor.startup(function () {
  smtp = {
    username: 'rajit.deligence@gmail.com',  
    password: 'william123A@',   
    server:   'smtp.gmail.com',  
    port: 465
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
});

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
    user['friendsIds'] = options.friendsIds
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