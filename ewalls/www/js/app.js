
angular.module('ewalls', ['ionic', 'ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('welcome', {
      url: '/welcome',
      // abstract: true,
      templateUrl: 'templates/welcome.html',
      controller: 'AppCtrl'
    })

    .state('shop', {
      url: '/shop',
      templateUrl: 'templates/shop.html'
      // views: {
      //   'menuContent': {
      //     templateUrl: 'templates/shop.html',
      //     controller: 'AppCtrl'
      //   }
      // }
      // abstract: true,
    })

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: 'templates/search.html'
        }
      }
    })

    .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.single', {
      url: '/playlists/:playlistId',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlist.html',
          controller: 'PlaylistCtrl'
        }
      }
    })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/welcome');
})



.controller('AppCtrl', function($scope, $ionicModal, $timeout, DataService, $http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);


     // $http.get('http://ewallsnew.mediadevstaging.com/api/get_recent_posts/').then(function(resp){
     //   console.log('Success', resp); 
     // }, function(err){
     //   console.error('ERR', err);
     // })


     // var url = 'http://ewallsnew.mediadevstaging.com/?json=1'
     //  $http({
     //      method: 'JSONP',
     //      url: url
     //  }).then(function(resp){
     //   console.log('Success', resp); 
     // }, function(err){
     //   console.error('ERR', err);
     // })


    var promise = DataService.getAll().$promise;
      promise.then(function(_response) {
        console.debug(" The data " + JSON.stringify(_response));
        // $scope.items = _response.hits;
      });

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})



.factory('DataService', function( $resource){
  var url = 'http://ewallsnew.mediadevstaging.com/api/get_recent_posts/'
  var aSearchObject = $resource(url,{},{
    getAll : {
      method : 'JSONP',
    
      params : {
        // results  : ':results'
      }
    }
  });
  return {
    
    getAll : function() {

      console.log("aSearchObject...........", JSON.stringify(aSearchObject.getAll()));
      // var defaultFields = 'brand_id,item_name,item_id,brand_name,nf_calories,nf_total_fat';

      // if (!_params.fields) {
      //   _params.fields = defaultFields;
      // }
      return aSearchObject.getAll();             
    }
  }

})