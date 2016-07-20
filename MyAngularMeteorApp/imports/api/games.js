import { Mongo } from 'meteor/mongo';

export const Games = new Mongo.Collection('games');

if(Meteor.isServer){

	Meteor.publish('games', function(options, searchString) {
		if(searchString==null){
			searchString ='';
		}

		//console.log(">>> Options are. <<<", options);
		Counts.publish(this, 'numberOfGames', Games.find({ 'name': 
	    		{
	    			'$regex': '.*'+searchString || '' + '.*',
	    			'$options': 'i'
	    		} 
	    	}), { noReady: true });
		
		/*console.log("> > > ",Games.find(
	    	{ 'name': 
	    		{
	    			'$regex': '.*'+searchString || '' + '.*',
	    			'$options': 'i'
	    		} 
	    	}, options).fetch());*/

	    return Games.find(
	    	{ 'name': 
	    		{
	    			'$regex': '.*'+searchString || '' + '.*',
	    			'$options': 'i'
	    		} 
	    	}, options);

	});
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