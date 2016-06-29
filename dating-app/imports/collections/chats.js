import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';

import { check } from 'meteor/check';

export const Chats = new Mongo.Collection('chats');
 
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('chats', function() {
    return Chats.find()
  })
}

Meteor.methods({
  'addChat' (selectedUserId, currentUserId, selectedUserUsername,selectedUserFileId, message, currentUserName, currentUserFileId) {
	Chats.insert({
      selectedUserId,
      currentUserId, 
      selectedUserUsername,
      selectedUserFileId,
      message,
      currentUserName,
      currentUserFileId,
      createdAt: new Date()
    });
   },

   'getCurrentUserPreviousChats' (selectedUserId, currentUserId){
      return Chats.find({"selectedUserId":{$in:[selectedUserId, currentUserId]}, "currentUserId":{$in:[selectedUserId, currentUserId]}}).fetch()
     }
  
 
});