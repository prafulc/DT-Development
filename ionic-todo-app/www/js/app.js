var app = angular.module('ionic-todo-app', ['ionic', 'LocalStorageModule'])

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('ionic-todo-app');
  });

app.controller('main', function ($scope, $ionicModal, localStorageService) { 
    //initialize the tasks scope with empty array
    $scope.tasks = [];

    //initialize the task scope with empty object
    $scope.task = {};

    var taskData = 'task';


    //configure the ionic modal before use
    $ionicModal.fromTemplateUrl('new-task-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openTaskModal = function() {
      $scope.modal.show();
    };
    
    $scope.closeTaskModal = function() {
      $scope.modal.hide();
    };

    $scope.getTasks = function () {
          //fetches task from local storage
          if (localStorageService.get(taskData)) {
              $scope.tasks = localStorageService.get(taskData);
          } else {
              $scope.tasks = []
          }
    }
    $scope.createTask = function () {
          //creates a new task
          $scope.tasks.push($scope.task);
          localStorageService.set(taskData, $scope.tasks);
          $scope.task = {};
          //close new task modal
          $scope.modal.hide();
    }
    $scope.removeTask = function (index) {
          //removes a task
          $scope.tasks.splice(index, 1);
          localStorageService.set(taskData, $scope.tasks);
    }
    $scope.completeTask = function (index) { 
         //updates a task as completed 
         if (index !== -1) {
          $scope.tasks[index].completed = true; 
         } 

          localStorageService.set(taskData, $scope.tasks); 
    }
})