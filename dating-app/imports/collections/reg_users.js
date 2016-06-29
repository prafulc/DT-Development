import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';

import { check } from 'meteor/check';

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('userData', function() {
    return Meteor.users.find({}, {fields:{_id:1, fileId:1, username:1, firstname:1, lastname:1, emails:1, subscribe:1, personal_detail:1, friendsIds:1, blockedIds:1, iAmBlockedBy:1}});
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
		      height:regCred.height,
		      body_type:regCred.body_type,
		      weight:regCred.weight,
		      religion:regCred.religion,
		      interest:regCred.interest,
		      hobbies:regCred.hobbies,
					gender:regCred.gender
  		},
  		subscribe:regCred.subscribe,
		  personal_detail:personal_detail,
		  fileId:fileId,
      friendsIds:[],
      blockedIds:[],
      iAmBlockedBy:[],
      createdAt: new Date()
    }

    Accounts.createUser(user) 
  },

   'sendVerificationLink'(userId) {
    if (userId) {
      return Accounts.sendVerificationEmail(userId);
    }
  }
});
