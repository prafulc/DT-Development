/*Helper, we register here will become GLOBAL*/
/*Here we can't use ReactiveDict or ReactiveVar,,We can only use Session*/
Template.registerHelper('isDevEnvironment', function (template) {
  return Session.get('isDevEnvironment');
});

Template.registerHelper('isProdEnvironment', function (template) {
  return Session.get('isProdEnvironment');
});