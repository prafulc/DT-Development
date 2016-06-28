Template.dashboard.onRendered(function(){

	/*isProductionEnvironment method is defined in first-custom-package Server */
	Meteor.call('isProductionEnvironment', function (error, isProd) {
	  if (error) {
	    throw new Meteor.Error('detect-environment', 'Could not determine if in a production environment or not.');
	  } else {
	  	//console.log("Meteor Call Value Is ---->"+isProd);
	    Session.set('isDevEnvironment', !isProd);
	    Session.set('isProdEnvironment', isProd);
	  }
	});
			
});

Template.dashboard.helpers({

});

Template.dashboard.events({

});