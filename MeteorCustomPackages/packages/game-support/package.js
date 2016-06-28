Package.describe({
  name: 'amar09:game-support',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

both = ['client','server']

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('templating', 'client');
  api.use('session', 'client');

  api.use('aldeed:autoform@4.0.2 || 5.1.2', both);
  
  //api.addFiles('lib/both/collections.js', both);
  api.addFiles('lib/client/game-support.js', 'client');
  api.addFiles('lib/server/game-support.js', 'server');
  //api.addFiles('lib/server/allow.js', 'server');
  api.addFiles('lib/server/publish.js', 'server');
  api.addFiles('game-support.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('amar09:game-support');
  api.addFiles('game-support-tests.js');
});
