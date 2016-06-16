Games = new Mongo.Collection("games");
Games.attachSchema(new SimpleSchema({
  
  name: {
    type: String,
    label: "Name",
    max: 90
  },

  rating:{
  	type: Number,
  	label: "Rating"
  },

  category: {
    type: String,
    optional: true,
    label: "Category",
    autoform: {
      type: "select",
      options: function () {
        return [
          {label: "Action", value: "Action"},
          {label: "Strategic", value: "Strategic"},
          {label: "Puzzle", value: "Puzzle"}
        ];
      }
    }
  }

}));


Games.allow({
  'insert': function () {
    // add custom authentication code here
    return true;
  },
  'update': function(){
  	return true;
  },
  'remove': function(){
  	return true;
  }
});

/*
@Games = new Meteor.Collection('games');

Schemas.Games = new SimpleSchema
	name:
		type:String
		max: 60

	content:
		type: Number
		max: 1

	createdAt:
		type: Date
		autoValue: ->
			if this.isInsert
				new Date()

	updatedAt:
		type:Date
		optional:true
		autoValue: ->
			if this.isUpdate
				new Date()

	picture:
		type: String
		autoform:
			afFieldInput:
				type: 'fileUpload'
				collection: 'Attachments'

Games.attachSchema(Schemas.Games)
*/
/*
Posts.helpers
	author: ->
		user = Meteor.users.findOne(@owner)
		if user?.profile?.firstName? and user?.profile?.lastName
			user.profile.firstName + ' ' + user.profile.lastName
		else
			user?.emails?[0].address
*/