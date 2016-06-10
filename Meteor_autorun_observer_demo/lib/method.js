if(Meteor.isServer){
	Meteor.methods({
		insertRecord: function(fname, lname, email, address){
			Student.insert({
				"fname": fname,
				"lname": lname,
				"email": email,
				"address": address
			})
		}
	});
}