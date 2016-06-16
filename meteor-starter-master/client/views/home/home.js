Template.home.helpers({
	/*testing_t1(){
		//console.log("home->helper is working fine.");
		return "Some message.";
	}*/
});

Template.home.events({
	'click #testlink': function (event, template){
		console.log("Clicked on me !!");
		Router.go('/testroute');
	}
});