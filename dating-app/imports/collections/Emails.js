Accounts.emailTemplates.siteName = "Deligence Technologies";
Accounts.emailTemplates.from     = "Deligence Technologies <rajit.deligence@gmail.com>";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "Verify Your Email Address";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = "rajit.deligence@gmail.com",
        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  }
};

Accounts.emailTemplates.resetPassword = {
  subject() {
    return "Reset Your Password";
  },
  text( user, url ) {
    let urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = "rajit.deligence@gmail.com",
        emailBody      = `To reset your password, simply click the link below.\n\n${urlWithoutHash}\n\n If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  }
};