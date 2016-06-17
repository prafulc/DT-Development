import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';

import { check } from 'meteor/check';
 
export const RegUsers = new Mongo.Collection('users');

Meteor.methods({
 
  'addUser' (fileId, regCred) {

  	console.log("file last", fileId)
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
  

  /*'tasks.remove' (taskId) {
    check(taskId, String);
 
    Tasks.remove(taskId);
  },
  'tasks.setChecked' (taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 
    Tasks.update(taskId, {
      $set: {
        checked: setChecked
      }
    });
  },*/
});
