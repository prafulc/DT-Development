import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

//GoogleMaps.loadUtilityLibrary('/googleMapLib/MarkerClusterer.js');


Meteor.startup(function() {  
  GoogleMaps.load();
});

Template.map.onCreated(function() {  

//Meteor.subscribe('markers');

  	GoogleMaps.ready('map', function(map) {


  		/*adding markers on click event code starts*/
	  	google.maps.event.addListener(map.instance, 'click', function(event) {
	  		//console.log("events value at the time of insertiong is ------->", event);
	  		Meteor.call('InsertUserSelectedMarker', event.latLng.lat(), event.latLng.lng(), function (error, result){
  				if(error){
  					console.log("Getting error while calling Marker.insert method !", error);
  					throw error;
  				}else if(result){
  					console.log("Marker saved successfully !");
  				}	
	  		});
		}); 
		/*adding markers on click event code ends*/


		/*Geo Search code start*/
		google.maps.event.addListener(map.instance,'zoom_changed', function(event) {
			//console.log("Zoom Changed.");
			var bottomLeft=[map.instance.getBounds().getSouthWest().lng(),map.instance.getBounds().getSouthWest().lat()];
			var topRight=[map.instance.getBounds().getNorthEast().lng(),map.instance.getBounds().getNorthEast().lat()];		
			//console.log("bottomLeft = "+bottomLeft+"topRight = "+topRight);		
			Session.set('topRight',topRight);
			Session.set('bottomLeft',bottomLeft);
		});
		google.maps.event.addListener(map.instance,'center_changed', function() {
			//console.log("Center Changed.");
			var bottomLeft=[map.instance.getBounds().getSouthWest().lng(),map.instance.getBounds().getSouthWest().lat()];
			var topRight=[map.instance.getBounds().getNorthEast().lng(),map.instance.getBounds().getNorthEast().lat()];		
			//console.log("bottomLeft = "+bottomLeft+"topRight = "+topRight);
			Session.set('topRight',topRight);
			Session.set('bottomLeft',bottomLeft);
		});
		var bottomLeft=[map.instance.getBounds().getSouthWest().lng(),map.instance.getBounds().getSouthWest().lat()];
		var topRight=[map.instance.getBounds().getNorthEast().lng(),map.instance.getBounds().getNorthEast().lat()];		
		//console.log("bottomLeft = "+bottomLeft+"topRight = "+topRight);
		Session.set('topRight',topRight);
		Session.set('bottomLeft',bottomLeft);

	 	Tracker.autorun(function () {
		    var bLeft 	=	Session.get('bottomLeft');
		    var tRight 	=	Session.get('topRight');

		    
  			var MarkersSubs = Meteor.subscribe('OnScreenMarkers', bLeft,tRight);
		    // if subscription is ready, set limit to newLimit
		    if (MarkersSubs.ready()) {
		    	var markerList = Markers.find({});
		       console.log("> Markers(Geo Search data) Data: ", markerList.fetch());
		       //instance.loaded.set(limit);
		    	//performClustering(markerList);//Calling function for clustering Markers
		    } else {
		      	console.log("> Subscription is not ready yet. \n\n");
		    }
		});
		/*Geo Search code ends*/



		/*Setting marker for users current locations code starts*/
		var userLocationMarker = new google.maps.Marker({
			draggable: false,
			animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(Geolocation.latLng().lat, Geolocation.latLng().lng),
            map: map.instance,
			icon: '/img/rsz_1rsz_1rsz_markbig.png',
            title:'You current location',
        });

        //openining Info window on userLocationMarker click event
        var currentLocationInfowindow = new google.maps.InfoWindow({
           content: "Your Current Postion!<br>"+Geolocation.latLng().lat+", "+Geolocation.latLng().lng
        });
        userLocationMarker.addListener('click', function() {
			currentLocationInfowindow.open(map.instance, userLocationMarker);
	    });
        //openining Info window on marker click event

		/*User Location Events*/
		userLocationMarker.addListener('dblclick', function() {
			console.log("Our dblclick zoom-in event is working fine.");
			map.instance.setZoom(20);
			map.instance.setCenter(userLocationMarker.getPosition());
		});
		/*Setting marker for users current locations code starts*/



		/*Fetching and observing changes in markers saved in our db*/	
		var markers = {};
		var Markerer = [];	// Declaring this for clusters
		Markers.find({}).observe({
		  	added: function(document) {
		  		//console.log("Map parameters are : ", document);
			    // Create a marker for this document
			    var marker = new google.maps.Marker({
			      draggable: true,
			      animation: google.maps.Animation.BOUNCE,
			      position: new google.maps.LatLng(document.lat, document.lng),//map.instance.getCenter(),////////
			      map: map.instance,
			      icon: '/img/rsz_1rsz_custommarker.png',
               	  title:'Click on me',
			      // We store the document _id on the marker in order to update the document within the 'dragend' event below.
			      id: document._id
			    });
			    

			    var infowindow = new google.maps.InfoWindow({
	               content: document.lat+", "+document.lng
	            });

	            marker.addListener('click', function() {
					infowindow.open(map.instance, marker);
			    });
	            // This listener lets us drag markers on the map and update their corresponding document.
			    

			    google.maps.event.addListener(marker, 'dragend', function(event) {
			      Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
			    });
			    // Store this marker instance within the markers object.

			    markers[document._id] = marker;

			    Markerer.push(marker);
			    console.log("IN OBSERVER: MARKERER VALUE IS --->", Markerer);
		  		//performClustering();
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
		

		function performClustering(){
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

			console.log("IN CLUSTER: MARKERER VALUES IS     ---->>> ", Markerer);
			/*Code for clustering */
			var clusterOptions = {
			  'zoom': 17,
			  'center': new google.maps.LatLng(Geolocation.latLng().lat, Geolocation.latLng().lng),
			  'mapTypeId': google.maps.MapTypeId.HYBRID,
			  'styles': clusterStyles,	
			};
			var markerCluster = new MarkerClusterer(map.instance, Markerer, clusterOptions);
			/*Code for clustering */		
		}

		//Meteor.setTimeout(performClustering, 3000);

		/*Shapes*/	
		/*Polygon*/
	        /*var tourplan = new google.maps.Polygon({
	           path:[
	              new google.maps.LatLng(28.613939, 77.209021),//delhi
	              new google.maps.LatLng(13.082680, 80.270718),//chennai
	              new google.maps.LatLng(18.520430, 73.856744),//pune
	              new google.maps.LatLng(12.971599, 77.594563) //banglore
	           ],
	           
	           strokeColor:"#cc0000",
	           strokeOpacity:1.0,
	           strokeWeight:5,
	           fillColor:"#0000FF",
	           fillOpacity:0.4
	        });
	        tourplan.setMap(map.instance);*/	
		/*Polygon*/

		/*circle*/
        var myCity = new google.maps.Circle({
           center:new google.maps.LatLng(18.5204,73.8567),//pune
           radius:150600,
        
           strokeColor:"#B40404",
           strokeOpacity:0.6,
           strokeWeight:2,
        
           fillColor:"#B40404",
           fillOpacity:0.1
        });
        myCity.setMap(map.instance);	
		/*circle*/
		/*Shapes*/			


  	});
});

Template.map.helpers({  
  mapOptions: function() {

    if (GoogleMaps.loaded()) {
    	//console.log("Geolocation.latLng() ----------> Value is ",Geolocation.latLng());
      var latlngValue = Geolocation.latLng();
      //console.log("latlng value is ---------->", latlngValue);
      return {
        center: new google.maps.LatLng(latlngValue.lat, latlngValue.lng),
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.HYBRID,
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
