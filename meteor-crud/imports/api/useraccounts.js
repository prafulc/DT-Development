import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';




Meteor.methods({

	'useraccount.insert'(doc){
		console.log("Received Doc is ----->", doc);

        /*Accounts.createUser({
            email: doc.email,
            password: doc.password,
            username: doc.username,
            profile:{ 
            		age: doc.age, 
            		profilepic: doc.profilepic, 
            		contact: doc.mobile 
            	}
        }, function (error){
            if(error){
                console.log("Getting Error.."+error.reason);    
                if(error.reason=="Email already exists."){
                    
                }else{
                    /*$('#email').css('border','1px solid green');
                    $('.email-msg').text(""); */
        /*        }
                if(error.reason=="Username already exists."){
                	
                }else{/*
                    $('#username').css('border','1px solid green');
                    $('.username-msg').text(""); */
        /*        }
            }
            else{
            	console.log("New User Created.");
                FlowRouter.go('/');              
            }
        });*/
	}/*,

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
	}*/
});
