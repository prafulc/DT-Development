Package.describe({
  name: 'amar09:first-custom-package',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('templating', 'client');
  api.use('session', 'client');
  api.addFiles('lib/client/first-custom-package.js', 'client');
  api.addFiles('lib/server/first-custom-package.js', 'server');
  //api.addFiles('first-custom-package.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('amar09:first-custom-package');
  api.addFiles('first-custom-package-tests.js');
});
