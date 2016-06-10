Meteor.publish('user.current', function currentUserPublication() {

    return Meteor.users.find();
    //return Accounts.user(); //users.findOne(Meteor.userId());

});

Meteor.publish('users.list', function userListPublication() {

	//console.log("userlist fetched in publish is-------->",Meteor.users.find().fetch() );
    return Meteor.users.find();
    //return Accounts.user(); //users.findOne(Meteor.userId());

});
