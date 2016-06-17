/* This file define angular module, which is linked with different routing url and each of which is linked with diff controller */

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngFileUpload from 'ng-file-upload';
import { Meteor } from 'meteor/meteor';
import { RegUsers } from '../collections/reg_users.js';
import { Images } from '../collections/images.js';
 
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

.controller('homeCtrl', ['$scope', '$state', function($scope, $state) {
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
      var file = $scope.regCred.file;
      var regCred1 = {};
      regCred1.firstname = $scope.regCred.firstname;
      regCred1.lastname = $scope.regCred.lastname;
      regCred1.mobile = $scope.regCred.mobile;
      regCred1.email = $scope.regCred.email;
      regCred1.password = $scope.regCred.password;
      regCred1.file = $scope.regCred.file;
      regCred1.male = $scope.regCred.male;
      regCred1.female = $scope.regCred.female;


      $scope.regCred.firstname = '';
      $scope.regCred.lastname = '';
      $scope.regCred.mobile = '';
      $scope.regCred.email = '';
      $scope.regCred.password = '';
      $scope.regCred.file = '';
      $scope.regCred.male = '';
      $scope.regCred.female = '';
      angular.element("input[type='file']").val(null);
      Images.insert(file, function(err, fileObj) {
           if(err){
            //handle error
           }else{
            var fileId = fileObj. _id;
            Meteor.call('addUser', fileId, regCred1);
           }
      })
   }
}])

.controller('loginCtrl', ['$scope', '$meteor','$state', function($scope, $meteor, $state) {
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
  $scope.userimg = "/images/avatar.png"


  //srcset   srcset="http://0.gravatar.com/avatar/39c1bd42f9d28be4e8f22168a7ab8316?s=120&amp;d=mm&amp;r=g 2x"
  }])

.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}])