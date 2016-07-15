import { Mongo } from 'meteor/mongo';
import Records from '../ui/Record.js';

export const Record = new Mongo.Collection('record');


if(Meteor.isServer){
	Meteor.publish('record',function(){
		return Record.find();
	});
}

Meteor.methods({
	'add':function(task,desc){
		Record.insert({task:task, desc:desc});
	}
});
