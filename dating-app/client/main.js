import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';
import { RegUsers } from '../imports/collections/reg_users.js';
import  dating from '../imports/components/dating.js';

angular.module('dating-app', [
  angularMeteor,
  dating.name
]);