import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';

import { check } from 'meteor/check';
 
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('users', function() {
    return Meteor.users.find();
  })
}

Meteor.methods({
  'addUser' (fileId, regCred) {
    check(regCred.firstname, String);
    check(regCred.mobile, String);
    check(regCred.email, String);
    check(regCred.password, String);

    var personal_detail = false
    if(regCred.firstname && regCred.email && regCred.mobile && regCred.interest && fileId){
    		personal_detail = true
    }

    var user = {
      username:regCred.email,
    	email:regCred.email,
  		password:regCred.password,
  		profile:{
  				firstname:regCred.firstname,
		      lastname:regCred.lastname,
		      mobile:regCred.mobile,      
		      age:regCred.age,
		      martial_status:regCred.martial_status,
		      height:regCred.height,
		      body_type:regCred.body_type,
		      any_disability:regCred.any_disability,
		      weight:regCred.weight,
		      religion:regCred.religion,
		      interest:regCred.interest,
		      hobbies:regCred.hobbies,
					male:regCred.male,
		      female:regCred.female
  		},
  		subscribe:regCred.subscribe,
		  personal_detail:personal_detail,
		  fileId:fileId,
		  sendVerificationEmail:true,
      createdAt: new Date()
    }

    Accounts.createUser(user) 
  },

   'sendVerificationLink'(userId) {
    if (userId) {
      Accounts.sendVerificationEmail(userId);
    }
  }
});
