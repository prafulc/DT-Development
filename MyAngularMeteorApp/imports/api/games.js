import { Mongo } from 'meteor/mongo';

export const Games = new Mongo.Collection('games');

if(Meteor.isServer){
	Meteor.publish('games', function(){
		//console.log("Games are ->", Games.find({}).fetch());
		return Games.find();
	})
}

Games.allow({
	insert(){
		return true;
	},
	update(){
		return true;
	},
	remove(){
		return true;
	},
})

/*Parties.allow({
  insert(userId, party) {
    return userId && party.owner === userId;
  },
  update(userId, party, fields, modifier) {
    return userId && party.owner === userId;
  },
  remove(userId, party) {
    return userId && party.owner === userId;
  }
});*/