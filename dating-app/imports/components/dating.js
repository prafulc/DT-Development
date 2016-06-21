/* This file define angular module, which is linked with different routing url and each of which is linked with diff controller */

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngFileUpload from 'ng-file-upload';
import { Meteor } from 'meteor/meteor';
import { Images } from '../collections/images.js';
 

Meteor.subscribe('users');
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

.controller('homeCtrl', ['$scope', '$state', 'Data', 'UserProfile', function($scope, $state, Data, UserProfile) {
   $scope.login = function(cred){
      UserProfile.isUserExists($scope, $state, cred, Data)
   }

   $scope.register = function(regCred){
      var file = $scope.regCred.file;
      var regCred1 = {};
      for (var key in $scope.regCred) {
        regCred1[key] = $scope.regCred[key]
      }

      for (var key in $scope.regCred) {
        $scope.regCred[key] = '';
      }

      angular.element("input[type='file']").val(null);
      var cred = {"username":regCred1.email}
      if(file){
          Images.insert(file, function(err, fileObj) {
             if(err){
              //handle error
             }else{
                if(fileObj && fileObj._id){
                    var fileId = fileObj._id;
                    Meteor.call('addUser', fileId, regCred1, function(err, res){
                      console.log("err>>>>>>1>>>>>>>>>"+err);
                      console.log("res>>>>>>1>>>>>>>>>"+JSON.stringify(res));
                      if(!err){
                        Meteor.call('sendVerificationLink', function (err, res){
                            console.log("err>>>>>>>>>>"+err)
                            if(!err){
                              console.log("enter>>>>>>>>>>>>");
                              UserProfile.isUserExists($scope, $state, cred, Data);
                            }
                        })  
                      }
                    })
                }
             }
          })
      }else{
          Meteor.call('addUser', undefined, regCred1);
          UserProfile.isUserExists($scope, $state, cred, Data);
      }
      
   }
}])

.controller('loginCtrl', ['$scope', '$state', 'Data', 'UserProfile', function($scope, $state, Data, UserProfile) {
    $scope.login = function(cred){
      UserProfile.isUserExists($scope, $state, cred, Data)
    }
  }])

.controller('forgotpasswordCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
  
  }])

.controller('userCtrl', ['$scope', 'Data', '$state', function($scope, Data, $state) {
    if(Data.getCurrentUserFileId()){
       $scope.userimg = "/cfs/files/images/"+Data.getCurrentUserFileId()
    }else{
       $scope.userimg = "/images/avatar.png"
    }
    $scope.email_verified = "Not Completed"
    $scope.image_uploaded = "Not Completed"
    $scope.personal_detail = "Not Completed"
    $scope.subscription = "Not Completed"
    var userInfo = Meteor.users.find({"_id":Data.getCurrentUserId()}, {fields:{email_verified:1, fileId:1, subscribe:1, personal_detail:1}}).fetch()
    if(userInfo && userInfo.length>0){
      var user = userInfo[0];
      $scope.email_verified = user && user.email_verified ? "Completed" : "Not Completed"
      $scope.image_uploaded = user && user.fileId ? "Completed" : "Not Completed"
      $scope.personal_detail = user && user.personal_detail ? "Completed" : "Not Completed"
      $scope.subscription = user && user.subscribe ? "Completed" : "Not Completed"
    }
    
    $scope.email_verified_number = $scope.email_verified=="Completed" ? 25 : 0;
    $scope.image_uploaded_number = $scope.image_uploaded=="Completed" ? 25 : 0;
    $scope.personal_detail_number = $scope.personal_detail=="Completed" ? 25 : 0;
    $scope.subscription_number = $scope.subscription=="Completed" ? 25 : 0;
    $scope.profile_complete = $scope.email_verified_number + $scope.image_uploaded_number + $scope.personal_detail_number + $scope.subscription_number


    $scope.logout = function(){
        Meteor.logout();
        Data.setCurrentUserId('')
        Data.setCurrentUserFileId('')
        $state.go('home')
    }

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

.factory('UserProfile', function () {
    return {
      isUserExists : function($scope, $state, cred, Data){
          var userInfo = Meteor.users.find({"username":cred.username}, {fields:{_id:1, fileId:1}}).fetch()
          $scope.cred.username = '';
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