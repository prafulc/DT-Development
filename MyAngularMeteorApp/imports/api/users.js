import { Mongo } from 'meteor/mongo';

//export const Users = new Mongo.Collection('users');

if(Meteor.isServer){
	Meteor.publish('currentUserInfo', function currentUserDetails(){

    	return Meteor.users.find();
	})
}