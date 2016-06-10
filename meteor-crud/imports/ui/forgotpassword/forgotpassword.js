// Ensure we have the token to pass into the template when it's present
import './forgotpassword.html';

import { Accounts } from 'meteor/accounts-base';


if (Accounts._resetPasswordToken) {  
  console.log("reset pass token ---->",Accounts._resetPasswordToken );
  Session.set('resetPasswordToken', Accounts._resetPasswordToken);
}

Template.forgotpassword.helpers({  
  resetPassword: function() {
    return Session.get('resetPasswordToken');
  }
});

Template.forgotpassword.events({  

  'submit #forgot-password': function(event, template) {
/*    var email = $('[name=email]').val(), //template.find('#user-email'),
      message;
      console.log("---->Email .is =  ",email);
    // You will probably want more robust validation than this!
    if (email) {
      // This will send a link to the address which, upon clicking, prompts the user to enter a new password.
      Accounts.forgotPassword(email);
      message = 'Sent a reset password link to ' + email + '.';
    } else {
      message = 'Please enter a valid email address.'
    }

    // Inform the user.
    template.find('#form-messages').html(message);
*/

    //var forgotPasswordForm = $(event.currentTarget);
    //var email =  $('#user-email').val().trim().toLowerCase();
    var message = "";
    //if (isNotEmpty($('#user-email').val()) && isEmail($('#user-email').val())) {
    if($('#user-email').val()!=''){  
      Accounts.forgotPassword({email: $('#user-email').val()}, function (err) {
        if(err){
            if (err.message === 'User not found [403]') {
              console.log('This email does not exist.');
              message = 'This email does not exist.';
            } 
            else {
              console.log('We are sorry but something went wrong.');
              message = 'We are sorry but something went wrong.';
            }
        } 
        else{
            console.log('Email Sent. Check your mailbox.');
            message = 'Email Sent. Check your mailbox.';
        }
      });
      // Inform the user.
      $('#form-messages').html(message);
    }  
    return false;
  },

   'submit #set-new-password': function (event, template) {

    
    // Proper decoupled validation would be much nicer than this
    var password = $('#new-password').val(),
      passwordTest = new RegExp("(?=.{6,}).*", "g");

    // If the password is valid, we can reset it.
    if (passwordTest.test(password)) {
        Accounts.resetPassword(
          Session.get('resetPasswordToken'),
          password,
          function (error) {
            if (err) {
              $('#form-messages').html('There was a problem resetting your password.');
            } else {
              // Get rid of the token so the forms render properly when they come back.
              Session.set('resetPasswordToken', null);
            }
          }
        );
    } else {
      // Looks like they blew it
      $('#form-messages').html('Your password is too weak!');
    }

    return false;
  } 
});