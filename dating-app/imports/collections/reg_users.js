import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';

import { check } from 'meteor/check';
 
export const RegUsers = new Mongo.Collection('reg_users');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('reg_users', function() {
    return RegUsers.find()
  })
}

Meteor.methods({
  'addUser' (fileId, regCred) {
    check(regCred.firstname, String);
    check(regCred.mobile, String);
    check(regCred.email, String);
    check(regCred.password, String);
    RegUsers.insert({
      firstname:regCred.firstname,
      lastname:regCred.lastname,
      mobile:regCred.mobile,
      email:regCred.email,
      username:regCred.email,
      password:regCred.password,
      fileId:fileId,
      male:regCred.male,
      female:regCred.female,
      createdAt: new Date()
    })
  },
});
