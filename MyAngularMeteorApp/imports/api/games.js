import { Mongo } from 'meteor/mongo';

export const Games = new Mongo.Collection('games');

if(Meteor.isServer){
	Meteor.publish('games', function(){
		console.log("Games are ->", Games.find({}).fetch());
		return Games.find();
	})
}