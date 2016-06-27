import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';

import { check } from 'meteor/check';

export const Blocks = new Mongo.Collection('blocks');
 
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('blocks', function() {
    return Blocks.find()
  })
}

Meteor.methods({
  'addBlock' (userId, currentUserId, userFileId, userUsername) {
  		var isUserAlreadyExists = Blocks.find({userId:userId, currentUserId:currentUserId}).count()
  		if(isUserAlreadyExists==0){
			Blocks.insert({
		      userId,
		      currentUserId, 
		      userFileId, 
		      userUsername,
		      createdAt: new Date()
		    });
  		}  		
   },

   'addBlockedInUsers' : function(currentUserId, userId){
		Meteor.users.update(currentUserId, {
	      $addToSet: { blockedIds: userId}
		})
	},

	'addIamBlockedByUsers' : function(currentUserId, userId){
			Meteor.users.update(userId, {
		      $addToSet: { iAmBlockedBy: currentUserId}
			})
	}
 
});