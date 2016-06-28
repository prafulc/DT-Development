Package.describe({
  name: 'amar09:simple',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

var both = ['client','server'];

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use("templating", "client");
  
  api.addFiles(
  [
    'aTemplate.html' 
  ], 'client');

  api.addFiles(
  [
    'serverFunction.js'
  ], 'server');

  api.addFiles(
  [
    'simple.js' 
  ], both);

  api.export('capitalise', 'server');   /*Making our capitalise function accessible from server*/

});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('amar09:simple');
  api.addFiles('simple-tests.js');
});
