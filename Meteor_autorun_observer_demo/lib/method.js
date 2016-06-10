if(Meteor.isServer){
	Meteor.methods({
		
		/*-------- Insert record in database -----------*/
		
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