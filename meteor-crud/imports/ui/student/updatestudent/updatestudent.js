import './updatestudent.html';
//import '../../../api/students.js';

Template.updatestudent.onRendered(function(){

});

Template.updatestudent.events({
	
});

Template.updatestudent.helpers({
	studentid(){
		return Students.findOne(FlowRouter.getParam("id"));
	}
});