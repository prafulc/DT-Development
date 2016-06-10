import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Employees = new Mongo.Collection('employees');

Meteor.methods({

	'employees.insert'(doc){
		
		Employees.insert({
		  EmpName: doc.EmpName, 
		  Email: doc.Email,
		  Age: doc.Age,
		  Contact: doc.Contact,
		  ProfilePic: doc.ProfilePic
		}, function (error){
			if(error){
				console.log("-> Getting Error: "+error);
			}
		});

		FlowRouter.go('/');
	},

	'employees.update'(doc){

		Employees.update(doc.empId, {
			$set:{
				EmpName: doc.empName,
				Email: doc.email,
				Age: doc.age,
				Contact: doc.contact,
			}
		}, function (error, result){
			if(error)
				console.log("error is "+error);
			else
				console.log("result is "+result);
		});
	}
});
