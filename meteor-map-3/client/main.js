import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Meteor.startup(function() {  
  GoogleMaps.load();
});

Template.map.onCreated(function() {  
  	GoogleMaps.ready('map', function(map) {
  	 
	  	google.maps.event.addListener(map.instance, 'click', function(event) {

	  		console.log("events value at the time of insertiong is ------->", event);
		
		    Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
		
		});

		var markers = {};

		Markers.find().observe({  
		  	added: function(document) {

		  		console.log("Map parameters are : ", document);
			    
			    // Create a marker for this document
			    var marker = new google.maps.Marker({
			      draggable: true,
			      animation: google.maps.Animation.DROP,
			      position: new google.maps.LatLng(document.lat, document.lng),
			      map: map.instance,
			      // We store the document _id on the marker in order 
			      // to update the document within the 'dragend' event below.
			      id: document._id
			    });

			    // This listener lets us drag markers on the map and update their corresponding document.
			    google.maps.event.addListener(marker, 'dragend', function(event) {
			      Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
			    });

			    // Store this marker instance within the markers object.
			    markers[document._id] = marker;
		  	},
		  	changed: function(newDocument, oldDocument) {
		    	markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
		  	},
		  	removed: function(oldDocument) {
			    // Remove the marker from the map
			    markers[oldDocument._id].setMap(null);

			    // Clear the event listener
			    google.maps.event.clearInstanceListeners(
			      markers[oldDocument._id]);

			    // Remove the reference to this marker instance
			    delete markers[oldDocument._id];
		  	}
		});



		function getBox() {
		    var bounds = GoogleMaps.maps.map.instance.getBounds();
		    var ne = bounds.getNorthEast();
		    var sw = bounds.getSouthWest();
		    Session.set('box', [[sw.lat(),sw.lng()], [ne.lat(),ne.lng()]]);
		}


	    this.autorun(function() {
            getBox();
            //var handle = Meteor.subscribe('places', Session.get('box'));

            console.log("Value of handle is =======>", handle);

            //if (handle.ready()) {
            var markers = Markers.find().fetch();

            _.each(markers, function(place) {
                var lat = markers.location.coordinates[0];
                var lng = markers.location.coordinates[1];

                if (!_.contains(lookup, lat+','+lng)) {  // ?
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(lat, lng),
                        map: GoogleMaps.maps.map.instance
                    });
                    lookup.push(lat+','+lng);
                }
            });
            //}
        }); 			
     
     //console.log("I'm ready!");
  	});
});

Template.map.helpers({  
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 8
      };
    }
  }
});



/*******************************************************************/
/*
Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
*/