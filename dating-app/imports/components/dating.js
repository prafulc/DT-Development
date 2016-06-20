/* This file define angular module, which is linked with different routing url and each of which is linked with diff controller */

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngFileUpload from 'ng-file-upload';
import { Meteor } from 'meteor/meteor';
import { RegUsers } from '../collections/reg_users.js';
import { Images } from '../collections/images.js';
 

Meteor.subscribe('reg_users');
Meteor.subscribe('images');


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

.controller('homeCtrl', ['$scope', '$state', 'Data', 'Account', function($scope, $state, Data, Account) {
   $scope.login = function(cred){
      Account.login($scope, $state, cred, Data)
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
      var cred = {"email":regCred1.email, "password":regCred1.password}
      if(file){
          Images.insert(file, function(err, fileObj) {
             if(err){
              //handle error
             }else{
                if(fileObj && fileObj._id){
                    var fileId = fileObj._id;
                    Meteor.call('addUser', fileId, regCred1, function(err, res){
                      if(!err){
                        Account.login($scope, $state, cred, Data);
                      }
                    });
                }
             }
          })
      }else{
          Meteor.call('addUser', undefined, regCred1);
          Account.login($scope, $state, cred, Data);
      }
      
   }
}])

.controller('loginCtrl', ['$scope', '$state', 'Data', 'Account', function($scope, $state, Data, Account) {
    $scope.login = function(cred){
      Account.login($scope, $state, cred, Data)
    }
  }])

.controller('forgotpasswordCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
  
  }])

.controller('userCtrl', ['$scope', 'Data', function($scope, Data) {
    if(Data.getCurrentUserFileId()){
       $scope.userimg = "/cfs/files/images/"+Data.getCurrentUserFileId()
    }else{
       $scope.userimg = "/images/avatar.png"
    }
    $scope.email_verified = "Completed"
    $scope.image_uploaded = "Not Completed"
    $scope.personal_detail = "Completed"
    $scope.subscription = "Not Completed"

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

.factory('Data', function () {
    var data = {
        userId: '',
        fileId:''
    }
    return {
        getCurrentUserId: function () {
            return data.userId;
        },
        setCurrentUserId: function (userId) {
            data.userId = userId;
        },
        getCurrentUserFileId : function (){
            return data.fileId;
        },
        setCurrentUserFileId : function (fileId){
            data.fileId = fileId;
        }
    }
})

.factory('Account', function () {
    return {
      login : function($scope, $state, cred, Data){
          var userInfo = RegUsers.find({"email":cred.email, "password":cred.password}, {fields:{_id:1, fileId:1}}).fetch()
          $scope.cred.email = '';
          $scope.cred.password = '';
          if(userInfo && userInfo.length>0){
            Data.setCurrentUserId(userInfo[0]._id)
            Data.setCurrentUserFileId(userInfo[0].fileId)
            $state.go('user')
          }else{
            $state.go('login')
          }
      }
    }
})