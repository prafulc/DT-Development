import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
///var/www/AOAR-system/21-on-dashboard_bkp/public/googlemapLib/MarkerClusterer.js

//GoogleMaps.loadUtilityLibrary('/googleMapLib/MarkerClusterer.js');


Meteor.startup(function() {  
  GoogleMaps.load();
});

Template.map.onCreated(function() {  
  	GoogleMaps.ready('map', function(map) {

  		// For adding markers
	  	google.maps.event.addListener(map.instance, 'click', function(event) {
	  		//console.log("events value at the time of insertiong is ------->", event);
		    Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
		});
  		// For adding markers

		var markers = {};
		var Markerer = [];	// Declaring this for clusters

		Markers.find().observe({
		  	added: function(document) {
		  		console.log("Map parameters are : ", document);
			    // Create a marker for this document
			    var marker = new google.maps.Marker({
			      draggable: true,
			      animation: google.maps.Animation.BOUNCE,
			      position: new google.maps.LatLng(document.lat, document.lng),//map.instance.getCenter(),////////
			      map: map.instance,
			      icon: '/img/rsz_1rsz_custommarker.png',
			      /*icon: {
	                  path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
	                  scale: 5,
	                  strokeWeight:2,
	                  strokeColor:"#B40404"
               	  },*/
			      // We store the document _id on the marker in order to update the document within the 'dragend' event below.
			      id: document._id
			    });

			    // This listener lets us drag markers on the map and update their corresponding document.
			    google.maps.event.addListener(marker, 'dragend', function(event) {
			      Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
			    });
			    // Store this marker instance within the markers object.
			    markers[document._id] = marker;
			    Markerer.push(marker);
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


//Clustering 		
		var clusterStyles = [
				  		{
							height: 53,
							url: "/img/m/m1.png",
							width: 53
						},
						{
							height: 56,
							url: "/img/m/m2.png",
							width: 56
						},
						{
							height: 66,
							url: "/img/m/m3.png",
							width: 66
						},
						{
							height: 78,
							url: "/img/m/m4.png",
							width: 78
						},
						{
							height: 90,
							url: "/img/m/m5.png",
							width: 90
						}
					];

		var clusterOptions = {
		  'zoom': 13,
		  'center': new google.maps.LatLng(-37.8136, 144.9631),
		  'mapTypeId': google.maps.MapTypeId.ROADMAP,
		  'styles': clusterStyles,	
		};
		var markerCluster = new MarkerClusterer(map.instance, Markerer, clusterOptions);






//Clustering 	

		/*function getBox() {
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
        }); */			
     
     //console.log("I'm ready!");
  	});
});

Template.map.helpers({  
  mapOptions: function() {

    if (GoogleMaps.loaded()) {
    	//console.log("Geolocation.latLng() ----------> Value is ",Geolocation.latLng());
      var latlngValue = Geolocation.latLng();

      return {
        center: new google.maps.LatLng(latlngValue.lat, latlngValue.lng),
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
               
       	mapTypeControlOptions: {
          	style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,

           	position:google.maps.ControlPosition.TOP_CENTER,

           	mapTypeIds: [
             google.maps.MapTypeId.ROADMAP,
             google.maps.MapTypeId.SATELLITE,
             google.maps.MapTypeId.TERRAIN,
          	 google.maps.MapTypeId.HYBRID
          	]
       	},
			
       	zoomControl: true,
      	 
       	zoomControlOptions: { 
          style: google.maps.ZoomControlStyle.SMALL
       	}
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