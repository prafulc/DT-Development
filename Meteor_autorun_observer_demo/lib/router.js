/*---------- Home page route --------------*/

FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('AddRecordForm');
  }
});
