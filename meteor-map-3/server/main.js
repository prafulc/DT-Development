import { Meteor } from 'meteor/meteor';
import './methods/custom-methods.js';

Meteor.startup(() => {
  // code to run on server at startup
  Markers._ensureIndex( { location : "2dsphere" } );
});

/* Meteor.publish('humanElMap', function(bottomLeft,topRight){
  if(!bottomLeft && !topRight)
    return [];
  return HumanEl.find( { location: { $geoWithin: { $box:  [ bottomLeft, topRight ] } } } );
    
})*/

Meteor.publish('OnScreenMarkers', function(bottomLeft, upperRight){
  //console.log("bottomLeft"+bottomLeft+"upperRight"+upperRight);
  return Markers.find({ location: { $geoWithin: { $box: [ bottomLeft, upperRight ] } } } );
});

/*Meteor.publish('markers', function(){
  return Markers.find();
});*/

Meteor.methods({
	'InsertUserSelectedMarker': function(lattitude, longitude){
		//console.log("Value of lattitude is "+lattitude+":: Value of longitude is > "+longitude);
		var data = Markers.insert(
    	{ 
    		lng: longitude, 
    		lat: lattitude, 
    		location:{
    			type: "Point",
    			coordinates: [ 
  					longitude,					
  					lattitude 
    			]
    		}
    	});
	    return data;
	}
});
