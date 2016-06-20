import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';

var imageStore = new FS.Store.GridFS("images", {path: "~/var"})

export const Images = new FS.Collection("images", {
 	stores: [imageStore]
})

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('images', function() {
    return Images.find()
  })
}



Images.allow({
    'insert': function () {
        // add custom authentication code here
        return true;
      },
      'update': function () {
        // add custom authentication code here
        return true;
    },
      download: function(userId, fileObj) {
          return true
      }
})