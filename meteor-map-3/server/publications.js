/*Meteor.publish('OnScreenMarkers', function(bottomLeft, topRight){
    //console.log("bottomLeft"+bottomLeft+"upperRight"+upperRight);
    if(!bottomLeft && !topRight)
        return [];  
    return Markers.find( { location: { $geoWithin: { $box: [ bottomLeft, topRight ] } } } );
});*/