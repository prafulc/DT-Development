import '../imports/collections/reg_users.js';

import '../imports/collections/images.js';

import '../imports/collections/Emails.js';

Meteor.startup( function() {
  process.env.MAIL_URL = "smtp://postmaster%40sandbox856e4efc82814ecab3736cccb9f2d6b5.mailgun.org:6431f66f43707699ee4e84ae395e40cd@smtp.mailgun.org:587";
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
    return user
})

