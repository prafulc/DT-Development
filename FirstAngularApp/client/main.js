import angular from 'angular';
import angularMeteor from 'angular-meteor';
import '../imports/api/tasks.js';
import '../imports/startup/accounts-config.js';

//importing todosList.js file
import todosList from '../imports/components/todosList/todosList';


angular.module('simple-todos', [
  angularMeteor,
  todosList.name, 	//We are fetching names from todosList components  
  'accounts.ui'
]);
