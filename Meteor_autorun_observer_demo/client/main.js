import { Template } from 'meteor/templating';

import './main.html';

// Meteor.subscribe("studentRecord")

Template.AddRecordForm.events({
	'click .add'(e, t) {
  		e.preventDefault(); 
  		var fname = t.find('#fname').value;
  		var lname = t.find('#lname').value;
  		var email = t.find('#email').value;
  		var address = t.find('#address').value;
  		if(fname != "" && lname != "" && email != "" && address != ""){
  			Meteor.call("insertRecord", fname, lname, email, address);
  			t.find('#fname').value = "";
			t.find('#lname').value = "";
			t.find('#email').value = "";
			t.find('#address').value = "";
  		}else{
  			window.alert("Please input values");
  		}
  	}
});


Template.AddRecordForm.helpers({
  	students: function() {
    	return Student.find().fetch();
  	},
});

Template.AddRecordForm.onRendered(function() {
  	var self = this;
  	self.autorun(function() {
    	self.subscribe("studentRecord");
  	});

  	Student.find().observe({
  		added: function(document){
  			console.log("Record added ->", document._id);
  		},
  		changed: function(newDocument, oldDocument) {
    		console.log("Record changed ->", newDocument);
  		},
  		removed: function(oldDocument) {
  			console.log("Record removed ->", oldDocument._id);
  		}
  	})
});