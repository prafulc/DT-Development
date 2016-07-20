var GamesSchemas;

this.Games = new Meteor.Collection('games');

GamesSchemas = new SimpleSchema({

    
  name: {
    type: String,
    max: 60
  },
  description: {
    type: String,
    autoform: {
      rows: 5
    }
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    }
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
  }, 

  picture: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Attachments'
      }
    }
  },
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function() {
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
    autoform: {
      options: function() {
        return _.map(Meteor.users.find().fetch(), function(user) {
          return {
            label: user.emails[0].address,
            value: user._id
          };
        });
      }
    }
  }

});

Games.attachSchema(GamesSchemas);