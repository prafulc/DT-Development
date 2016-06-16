Template.testroute.helpers({
	testvar(){
		console.log("test var helper is working fine too");
		return "test var helper is working fine too";
	}
});

Template.testroute.events({
	'click #subheading': function(event,template){
		console.log("Clicked on subheading");
	}
});
