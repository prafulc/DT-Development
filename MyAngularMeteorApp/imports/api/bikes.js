import { Mongo } from 'meteor/mongo';

export const Bikes = new Mongo.Collection('bikes');

if(Meteor.isServer){
	Meteor.publish('bikes', function(){
		//console.log("Games are ->", Games.find({}).fetch());
		return Bikes.find();
	})
}