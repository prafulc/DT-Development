/* This file define angular module, which is linked with different routing url and each of which is linked with diff controller */

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngFileUpload from 'ng-file-upload';
import { Meteor } from 'meteor/meteor';
import { RegUsers } from '../collections/reg_users.js';
 
export default angular.module('dating', [
  angularMeteor,
  uiRouter,
  ngFileUpload
])
.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider){
	$locationProvider.html5Mode(true);

	 $stateProvider
	    .state('home', {
	      url: '/home',
	      templateUrl: 'client/home.html',
	      controller:'homeCtrl'
	    })

    	.state('login', {
		    url: '/login',
		    templateUrl: 'client/login.html',
	      controller:'loginCtrl'
  		})

      .state('forgotpassword', {
        url: '/forgotpassword',
        templateUrl: 'client/forgotpassword.html',
        controller:'forgotpasswordCtrl'
      })

      .state('user', {
        url: '/user',
        templateUrl: 'client/user.html',
        controller:'userCtrl'
      })
 
  $urlRouterProvider.otherwise('/home');
}])

.controller('homeCtrl', ['$scope', '$meteor','$state', 'Upload', '$timeout', function($scope, $meteor, $state, Upload, $timeout) {
   
   $scope.login = function(cred){
      var userCount = RegUsers.find({"email":cred.email, "password":cred.password}).count()
      $scope.cred.email = '';
      $scope.cred.password = '';
      if(userCount==0){
        $state.go('login')
      }else{
        $state.go('user')
      }
   }

   $scope.register = function(regCred){
      Meteor.call('addUser', regCred);

      $scope.regCred.firstname = '';
      $scope.regCred.lastname = '';
      $scope.regCred.mobile = '';
      $scope.regCred.email = '';
      $scope.regCred.password = '';
      $scope.regCred.file = '';
      $scope.regCred.male = '';
      $scope.regCred.female = '';
   }

    /*$scope.uploadPic = function(file) {
      console.log("called..........1..");
      file.upload = Upload.upload({
        url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
        data: {username: $scope.regCred.firstname, file: file},
      });

      file.upload.then(function (response) {
        console.log("response", response)
        console.log("file", file)
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        // Math.min is to fix IE which reports 200% sometimes
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    }*/

}])

.controller('loginCtrl', ['$scope', '$meteor','$state', function($scope, $meteor,$state) {
	
    $scope.login = function(cred){
        var userCount = RegUsers.find({"email":cred.email, "password":cred.password}).count()
        $scope.cred.email = '';
        $scope.cred.password = '';
        if(userCount==0){
          $state.go('login')
        }else{
          $state.go('user')
        }
     }


  }])

.controller('forgotpasswordCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
  
  }])

.controller('userCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
  
  }])

