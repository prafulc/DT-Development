/* This file define angular module, which is linked with different routing url and each of which is linked with diff controller */

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngFileUpload from 'ng-file-upload';
import angularMoment from 'angular-moment';
import { Meteor } from 'meteor/meteor';
import { Images } from '../collections/images.js';
import { Accounts } from 'meteor/accounts-base';

import { Friends } from '../collections/friends.js';

import { Blocks } from '../collections/blocks.js';

import { Chats } from '../collections/chats.js';
 
// Meteor.subscribe('userData');

Deps.autorun(function(){
  Meteor.subscribe('userData');
});
Meteor.subscribe('images');

export default angular.module('dating', [
  angularMeteor,
  uiRouter,
  ngFileUpload,
  angularMoment
])
.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider){
	$locationProvider.html5Mode(true);

	 $stateProvider
	    .state('home', {
	      url: '/home',
	      templateUrl: 'client/home.html',
	      controller:'homeCtrl'
	    })

      .state('signup', {
        url: '/signup',
        templateUrl: 'client/signup.html',
        controller:'signupCtrl'
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

      .state('verify-email', {
        url: '/verify-email/:token',
        templateUrl: 'client/emailVerification.html',
        controller:'verifyEmailCtrl'
      })

      .state('mail-send-successfully', {
        url: '/mail-send-successfully',
        templateUrl: 'client/MailSendSuccessfully.html',
        controller:'mailSendSuccessfullyCtrl'
      })

      .state('reset-password', {
        url: '/reset-password/:token',
        templateUrl: 'client/ResetPassword.html',
        controller:'resetPasswordCtrl'
      })

      

       
 
  $urlRouterProvider.otherwise('/home');
}])

.controller('homeCtrl', ['$scope', '$state', 'Data', 'UserProfile', function($scope, $state, Data, UserProfile) {
   $scope.login = function(cred){
      UserProfile.isUserExists($scope, $state, cred, Data)
   }
}])   

.controller('loginCtrl', ['$scope', '$state', 'Data', 'UserProfile', function($scope, $state, Data, UserProfile) {
    $scope.login = function(cred){
      UserProfile.isUserExists($scope, $state, cred, Data)
    }
  }])

.controller('signupCtrl', ['$scope', '$state', 'Data', 'UserProfile', function($scope, $state, Data, UserProfile) {
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
                         var userInfo = Meteor.users.find({"username":regCred1.email}, {fields:{_id:1}}).fetch()
                         if(userInfo && userInfo.length>0){
                            Meteor.call('sendVerificationLink', userInfo[0]._id,   function (err, res){
                              if(!err){
                                UserProfile.isUserExists($scope, $state, cred, Data);
                              }
                            })    
                         }
                      }
                    })
                }
             }
          })
      }else{
          Meteor.call('addUser', undefined, regCred1, function(err, res){
            if(!err){
               var userInfo = Meteor.users.find({"username":regCred1.email}, {fields:{_id:1}}).fetch()
               if(userInfo && userInfo.length>0){
                  Meteor.call('sendVerificationLink', userInfo[0]._id,   function (err, res){
                    if(!err){
                      UserProfile.isUserExists($scope, $state, cred, Data);
                    }
                  })    
               }
            }
          })
      }
      
   }
  }])

.controller('forgotpasswordCtrl', ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state) {
      $scope.forgotPassword = function(email){
        var options = {'email':email}
        Accounts.forgotPassword(options, function(err){
            if(!err){
                $state.go('mail-send-successfully');
            }
        })
      }   
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
    var userInfo = Meteor.users.find({"_id":Data.getCurrentUserId()}, {fields:{emails:1, fileId:1, subscribe:1, personal_detail:1}}).fetch()
    if(userInfo && userInfo.length>0){
      var user = userInfo[0];
      if(user && user.emails && user.emails.length>0 && user.emails[0].verified==true){
          $scope.email_verified = "Completed";
      }
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
      Data.resetTemporarilyHideUsers()
      Data.resetTemporarilyHideFriends()
      Data.setSelectedUserId('')
      Data.setSelectedUserUsername('')
      Data.setSelectedUserFileId('')
      Data.setCurrentUserUsername('')
      $state.go('home')
    }
    $scope.showProgressBar = true;
    
    $scope.home = function(){
      $scope.showUsersGridView = false
      $scope.showUsersListView = false
      $scope.showProgressBar=true
      $scope.showFriendsGridView=false
      $scope.showBlockedGridView=false
       $scope.showUsersChatView=false
    }

    $scope.search = function(){
      $scope.showUsersGridView = true
      $scope.showUsersListView = false
      $scope.showProgressBar=false
      $scope.showFriendsGridView=false
      $scope.showBlockedGridView=false
       $scope.showUsersChatView=false
    }

    $scope.showGridView = function(){
      $scope.showUsersListView = false;
      $scope.showUsersGridView = true;
      $scope.showFriendsGridView=false
      $scope.showBlockedGridView=false
       $scope.showUsersChatView=false
    }

    $scope.showListView = function(){
      $scope.showUsersListView = true;
      $scope.showUsersGridView = false;
      $scope.showFriendsGridView=false
      $scope.showBlockedGridView=false
       $scope.showUsersChatView=false
    }
    var currentUserId = Data.getCurrentUserId();
    if(currentUserId){
        $scope.currentUser = true;
    }else{
        $scope.currentUser = false;
    }
    
    $scope.updateMyUsers = function(){
        var userFriendsIds = Meteor.users.find({_id:currentUserId}, {fields:{friendsIds:1, blockedIds:1, iAmBlockedBy:1}}).fetch()
        var friendsIds = [];
        if(userFriendsIds && userFriendsIds.length>0 && userFriendsIds[0] && userFriendsIds[0].friendsIds){
            friendsIds = userFriendsIds[0].friendsIds
        }

        var blockedIds = [];
        if(userFriendsIds && userFriendsIds.length>0 && userFriendsIds[0] && userFriendsIds[0].blockedIds){
            blockedIds = userFriendsIds[0].blockedIds
        }

        var iAmBlockedBy = [];
        if(userFriendsIds && userFriendsIds.length>0 && userFriendsIds[0] && userFriendsIds[0].iAmBlockedBy){
            iAmBlockedBy = userFriendsIds[0].iAmBlockedBy
        }
        $scope.myUsers = Meteor.users.find({$and:[{_id:{$ne:currentUserId}}, {_id:{$nin:friendsIds}},  {_id:{$nin:blockedIds}}, {_id:{$nin:iAmBlockedBy}},  {_id:{$nin:Data.getTemporarilyHideUsers()}}]}, {fields:{fileId:1, firstname:1, lastname:1, username:1}}).fetch()
    }

    $scope.updateMyUsers()

    $scope.addFriend = function(friendId, friendFileId, friendUsername){
      Meteor.call('addFriend', friendId, currentUserId, friendFileId, friendUsername, function(){
          Meteor.call('addFriendInUsers', currentUserId, friendId, function(){
            $scope.updateMyUsers()
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
            }
          })
      })     
    }

    $scope.addBlock = function(userId, userFileId, userUsername){
      Meteor.call('addBlock', userId, currentUserId, userFileId, userUsername, function(){
          Meteor.call('addBlockedInUsers', currentUserId, userId, function(){
            Meteor.call('addIamBlockedByUsers', currentUserId, userId, function(){
              $scope.updateMyUsers()
              if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                  $scope.$apply();
              }
            })
          })
      })     
    }

    $scope.hideUserTemporarily = function(friendId){
        Data.setTemporarilyHideUsers(friendId)
        $scope.updateMyUsers()
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            $scope.$apply();
        }
    }

    $scope.getCurrentUserFriends = function(){
        Meteor.subscribe('friends');
        $scope.myFriends = Friends.find({"userId":currentUserId}).fetch()
     }

    $scope.getCurrentUserFriends()
  

    $scope.showMyFriends = function(){
        $scope.getCurrentUserFriends()
        $scope.showUsersGridView = false
        $scope.showUsersListView = false
        $scope.showProgressBar=false
        $scope.showFriendsGridView=true
        $scope.showBlockedGridView=false
        $scope.showUsersChatView=false
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            $scope.$apply();
        }
    }

    $scope.getCurrentUserBlocks = function(){
        Meteor.subscribe('blocks');
        $scope.myBlocks = Blocks.find({"currentUserId":currentUserId}).fetch()
    }

    $scope.getCurrentUserBlocks()

    $scope.showBlockedUsers = function(){
        $scope.getCurrentUserBlocks()
        $scope.showUsersGridView = false
        $scope.showUsersListView = false
        $scope.showProgressBar=false
        $scope.showFriendsGridView=false
        $scope.showBlockedGridView=true
        $scope.showUsersChatView=false
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            $scope.$apply();
        }
    }

    $scope.updateMyFriends = function(){
      Meteor.subscribe('friends');
      $scope.myFriends = Friends.find({"userId":currentUserId, friendId:{$nin:Data.getTemporarilyHideFriends()}}).fetch()
    }

    $scope.hideFriendTemporarily = function(selectedUserId){
        Data.setTemporarilyHideFriends(selectedUserId)
        $scope.updateMyFriends()
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            $scope.$apply();
        }
    }

    $scope.showChatView = function(selectedId, selectedUserId, selectedUserUsername, selectedUserFileId){
        Meteor.subscribe('chats');
        Data.setSelectedUserId(selectedUserId)
        Data.setSelectedUserUsername(selectedUserUsername)
        Data.setSelectedUserFileId(selectedUserFileId)
        Data.resetTemporarilyHideFriends();
        Meteor.call('getCurrentUserPreviousChats', selectedUserId, currentUserId, function(err, res){
            if(!err){
              $scope.hideFriendTemporarily(selectedUserId)
              $scope.chats = res;
              $scope.selectedUserFileId = selectedUserFileId
              $scope.selectedUserUsername = selectedUserUsername
              $scope.showUsersGridView = false
              $scope.showUsersListView = false
              $scope.showProgressBar=false
              $scope.showFriendsGridView=false
              $scope.showBlockedGridView=false
              $scope.showUsersChatView=true
              if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                  $scope.$apply();
              }
            }
        })
    }

    $scope.sendMessage = function(message){
        Meteor.subscribe('chats');
        var selectedUserId = Data.getSelectedUserId()
        var selectedUserUsername = Data.getSelectedUserUsername()
        var selectedUserFileId = Data.getSelectedUserFileId()
        var currentUserName = Data.getCurrentUserUsername()
        var currentUserFileId = Data.getCurrentUserFileId()
        Meteor.call('addChat', selectedUserId, currentUserId, selectedUserUsername, selectedUserFileId, message, currentUserName, currentUserFileId, function(){
          $scope.message = '';
          Meteor.call('getCurrentUserPreviousChats', selectedUserId, currentUserId, function(err, res){
              if(!err){
                $scope.chats = res;
                if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                    $scope.$apply();
                }
              }
          })
        })
    }

    $scope.getChatingClass = function(chatCurrentUserId){
      if(chatCurrentUserId==Data.getCurrentUserId()){
          return "chat_message_wrapper chat_message_right"
      }else{
        return "chat_message_wrapper"
      }
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
        fileId:'',
        username:'',
        hideUsers:[],
        hideFriends:[],
        selectedUserId:'',
        selectedUserName:'',
        selectedFileId:''
    }
    return {
        getCurrentUserId: function () {
            return data.userId;
        },
        setCurrentUserId: function (userId) {
            data.userId = userId;
        },
        setCurrentUserUsername:function(username){
            data.username = username;
        },
        getCurrentUserUsername:function(){
           return data.username;
        },
        getCurrentUserFileId : function (){
            return data.fileId;
        },
        setCurrentUserFileId : function (fileId){
            data.fileId = fileId;
        },
        getTemporarilyHideUsers : function (){
            return data.hideUsers;
        },
        setTemporarilyHideUsers : function (userId){
            data.hideUsers.push(userId)
        },
        resetTemporarilyHideUsers : function (){
            data.hideUsers = [];
        },


        getTemporarilyHideFriends : function (){
            return data.hideFriends;
        },
        setTemporarilyHideFriends : function (selectedUserId){
            data.hideFriends.push(selectedUserId)
        },
        resetTemporarilyHideFriends : function (){
            data.hideFriends = [];
        },



        setSelectedUserId:function(userId){
            data.selectedUserId = userId;
        },
        setSelectedUserUsername:function(username){
            data.selectedUserName = username;
        },
        setSelectedUserFileId:function(fileId){
            data.selectedFileId = fileId;
        },
        getSelectedUserId:function(){
            return data.selectedUserId;
        },
        getSelectedUserUsername:function(){
            return data.selectedUserName;
        },
        getSelectedUserFileId:function(){
            return data.selectedFileId;
        },
    }
})

.factory('UserProfile', function () {
    return {
      isUserExists : function($scope, $state, cred, Data){
        var userInfo = Meteor.users.find({"username":cred.email}, {fields:{_id:1, fileId:1, username:1}}).fetch()
        if($scope.cred && $scope.cred.email){
          $scope.cred.email = '';  
        }
        if($scope.cred && $scope.cred.password){
          $scope.cred.password = '';  
        }
        if(userInfo && userInfo.length>0){
          // Meteor.loginWithPassword(cred.email, cred.password);
          Data.setCurrentUserUsername(userInfo[0].username)
          Data.setCurrentUserId(userInfo[0]._id)
          Data.setCurrentUserFileId(userInfo[0].fileId)
          $state.go('user')
        }else{
          $state.go('login')
        }
      }
    }
})

.controller('verifyEmailCtrl', ['$scope', '$stateParams',  function($scope, $stateParams) {
      var token = $stateParams.token;
        if(token){
          Accounts.verifyEmail(token, function (error){
            if(!error) {
              //
            } 
          })
        }
  }])

.controller('resetPasswordCtrl', ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state) {
      $scope.resetPassword = function(cred){
          var newPass1 = cred.newPass1;
          var newPass2 = cred.newPass2;
          if(newPass1==newPass2){   
            var token = $stateParams.token;
              if(token && newPass1){
                Accounts.resetPassword(token, newPass1, function (error){
                  if(!error) {
                    $state.go('home')
                  } 
                })
              }
          }
      }
  }])

.controller('mailSendSuccessfullyCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {

}])

.directive('schrollBottom', function () {
  return {
    scope: {
      schrollBottom: "="
    },
    link: function (scope, element) {
      scope.$watchCollection('schrollBottom', function (newValue) {
        if (newValue)
        {
          $(element).scrollTop($(element)[0].scrollHeight);
        }
      });
    }
  }
})