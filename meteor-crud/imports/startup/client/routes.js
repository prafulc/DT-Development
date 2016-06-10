import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';
import '../../ui/layouts/app-body.js';
import '../../ui/home/home.js';
import '../../ui/signup/signup.js';
import '../../ui/signin/signin.js';
import '../../ui/student/student.js';
import '../../ui/student/insertstudent/insertstudent.js';
import '../../ui/student/updatestudent/updatestudent.js';
import '../../ui/forgotpassword/forgotpassword.js';
import '../../ui/users/users.js';
import '../../ui/users/updateuser/updateuser.js';

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'home' });
  },
});

FlowRouter.route('/sign_up', {
    action: function(params) {
        BlazeLayout.render('App_body', { main: "signup" });   
    }
});

FlowRouter.route('/sign_in', {
    action: function(params) {
        BlazeLayout.render('App_body', { main: "signin" });   
    }
});

FlowRouter.route('/forgotpassword', {
    action: function(params) {
        BlazeLayout.render('App_body', { main: "forgotpassword" });   
    }
});

/* Router.route('/#/reset-password/:token', {
name: 'resetpassword',
template: 'ResetPassword',
}); */

FlowRouter.route('/#/reset-password/:token', {
    action: function(params){
      BlazeLayout.render('App_body', {main: "forgotpassword"});
    },
    triggersEnter: [function(context, redirect) {
        console.log('http://localhost:3000/#/reset-password/-Np-EPwM5ASsoaPgK7bmOG6likbExg9ZJ7OlAjsC-oC');
    }]
});

var studentRoutes = FlowRouter.group({
  prefix: '/students',
  name: 'student',
  triggersEnter: [function(context, redirect) {
    //console.log('running group triggers');
  }]
});

// handling /students/
studentRoutes.route('/', {
  action: function() {
    BlazeLayout.render('App_body', {main: 'student'});
  },
  triggersEnter: [function(context, redirect) {
    //console.log('running /student trigger');
  }]
});

// handling /students/insert
studentRoutes.route('/insert', {
  action: function() {
    BlazeLayout.render('App_body', {main: 'insertstudent'});
  },
  triggersEnter: [function(context, redirect) {
    //console.log('running /student/insert trigger');
  }]
});

// handling /students/insert
studentRoutes.route('/delete/:id', {
  action: function(params) {
    console.log("Value of id is :: ", params.id);
    Students.remove(params.id);
    FlowRouter.go("/students/");
    //BlazeLayout.render('App_body', {main: 'insertstudent'});

  },
  triggersEnter: [function(context, redirect) {
    //redirect("/students/");
  }]
});

// handling /students/update
studentRoutes.route('/update/:id', {
  action: function() {
    BlazeLayout.render('App_body', {main: 'updatestudent'});
  },
  triggersEnter: [function(context, redirect) {
    //console.log('running /student/update trigger');
  }]
});


// routes for users group
var usersRoutes = FlowRouter.group({
  prefix: '/users',
  name: 'users',
  triggersEnter: [function(context, redirect) {
    //console.log('coming in /users');
  }]
});

usersRoutes.route('/', {
  action: function(){
    BlazeLayout.render('App_body', {main: 'users'});
  },
  triggersEnter: [function(context, redirect){
    //console.log('coming in /users/');
  }]
});

usersRoutes.route('/update/:id', {
  action: function(params){
    BlazeLayout.render('App_body', {main: 'updateuser'});
  },
  triggersEnter: [function(context, redirect){
    console.log('coming in /users/update /');
  }]
});

/*
FlowRouter.route('/addemployee', {
    action: function() {
        BlazeLayout.render('mainbody', { main: "employeeForm" });
    }
});

FlowRouter.route('/update_employee/:id', {
    action: function(params,queryParams) {
        BlazeLayout.render('mainbody', { main: "updateEmployee" });     
    }
});

FlowRouter.route('/delete_employee/:id', {
    action: function(params) {
        Employees.remove(params.id);
        FlowRouter.go('/');
    }
});



FlowRouter.route('/sign_in', {
    action: function(params) {
        BlazeLayout.render('mainbody', { main: "signin" });
    }
}); */