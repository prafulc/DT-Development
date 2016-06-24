import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';

import { check } from 'meteor/check';

export const Friends = new Mongo.Collection('friends');
 
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('friends', function() {
    return Friends.find()
  })
}

Meteor.methods({
  'addFriend' (friendId, userId, friendFileId, friendUsername) {
  		var isfriendAlreadyExists = Friends.find({friendId:friendId, userId:userId}).count()
  		if(isfriendAlreadyExists==0){
			Friends.insert({
		      friendId,
		      userId, 
		      friendFileId, 
		      friendUsername,
		      createdAt: new Date()
		    });
  		}  		
   },

   'addFriendInUsers' : function(userId, friendId){
		Meteor.users.update(userId, {
	      $addToSet: { friendsIds: friendId}
		})
	}
 
});