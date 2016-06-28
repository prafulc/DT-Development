Router.map(function() {
  
  this.route("home", {
    path: "/",
    layoutTemplate: "homeLayout"
  });

  this.route("dashboard", {
    
    path: "/dashboard",
    waitOn: function() {
      return [subs.subscribe('posts'), subs.subscribe('comments'), subs.subscribe('attachments')];
    },

    data: function() {
      return {
        posts: Posts.find({}, {sort: {createdAt: -1}}).fetch()
      };
    }
  });

  this.route("games", {
    path: "/games",
    waitOn: function() {
      return [subs.subscribe('attachments')];
    }
  });

});