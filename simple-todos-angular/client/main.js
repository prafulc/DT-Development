import angular from 'angular';
import angularMeteor from 'angular-meteor';
import todosList from '../imports/components/todosList/todosList.js';
import '../imports/startup/accounts-config.js';
 
//console.log("todosList>>>>>>>>>>>>>", JSON.stringify(todosList)); //{"_invokeQueue":[["$compileProvider","component",
//{"0":"todosList2","1":{"templateUrl":"imports/components/todosList/todosList.html"}}]],"_configBlocks":[],"_runBlocks":[],
//"requires":["angular-meteor"],"name":"todosList1"}

//console.log("todosList name>>>>>>>>>>>>>", todosList.name); //todosList1

angular.module('simple-todos', [
  angularMeteor,
  todosList.name,
  'accounts.ui'
]);