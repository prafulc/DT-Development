import { Meteor } from 'meteor/meteor';

import '../../api/common.js';

import '../../api/users.js';

import '../../api/students.js';
//import '../../api/useraccounts.js';

Images.allow({
  'insert': function () {
    // add custom authentication code here
    return true;
  }
});
