Games = new Mongo.Collection("games");
Games.attachSchema(new SimpleSchema({
  
  name: {
    type: String,
    optional: true,
    max: 60
  },

  description: {
    type: String,    
    optional: true,
    autoform: {
      rows: 5
    }
  },

  createdAt: {
    type: Date,
    optional: true,
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
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Attachments'
      }
    }
  },
  owner: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Id,
    /*autoValue: function() {
      if (this.isInsert) {
        return this.userId();
      }
    },*/
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

}));

Games.allow({
  insert: function(userId, doc) {
    return (userId === doc.owner);
  },
  remove: function(userId, doc) {
    return (userId === doc.owner);
  }
});