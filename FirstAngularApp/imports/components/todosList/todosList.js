import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Tasks } from '../../api/tasks.js'; 
import template from './todosList.html';


class TodosListCtrl {
 
//Code for Reading task from DB Starts 
  constructor($scope) {

    $scope.viewModel(this);
    this.hideCompleted = false; //initially we are showing all completed and incompleted object
    this.subscribe('tasks');


    this.helpers({
      tasks() {
        const selector = {};
        // If hide completed is checked, filter tasks
        if (this.getReactively('hideCompleted')) {
          selector.checked = {
            $ne: true
          };
        }
        //console.log("Tasks--->",Tasks.find({}).fetch());
        return Tasks.find(selector, { sort: { createdAt: -1 } });
      },
      incompleteCount() {
        return Tasks.find({
          checked: {
            $ne: true
          }
        }).count();
      },
      currentUser() {
        return Meteor.user();
      }


    });

    this.games = [
      {name: 'League of Legends'},
      {name: 'God of War'},
      {name: 'Dota 2'}
    ]
  
  }
//Code for Reading task from DB Ends


//Code for Inserting task into DB Starts
  addTask(newTask) {
    // Insert a task into the collection
    Meteor.call('tasks.insert', newTask);
 
    // Clear form
    this.newTask = '';
  }
//Code for Inserting task into DB Ends

  setChecked(task) {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', task._id, !task.checked);
  }
 
  removeTask(task) {
    Meteor.call('tasks.remove', task._id);
  }

  setPrivate(task) {
    Meteor.call('tasks.setPrivate', task._id, !task.private);
  }


}
 
export default angular.module('todosList', [
  angularMeteor
])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: ['$scope', TodosListCtrl] //TodosListCtrl
  });