
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
      templateUrl: 'templates/welcome.html',
      controller: 'AppCtrl'
    })

    // .state('app', {
    //   url: '/app',
    //   // abstract: true,
    //   templateUrl: 'templates/menu.html',
    //   controller: 'AppCtrl'
    // })

    .state('shop', {
      url: '/shop',
      templateUrl: 'templates/shop.html',
      controller: 'shopCtrl'
    })


    .state('user', {
      url: '/user',
      templateUrl: 'templates/user.html',
      controller: 'userCtrl'
    })

  $urlRouterProvider.otherwise('/welcome');
})


.controller('AppCtrl', function($scope, $ionicModal, $timeout, DataService, $http, WpJson, JsonEquals, $state, Data) {
  $scope.loginData = {};

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    // http://jsonplaceholder.typicode.com/users/1?email=saimon@devdactic.com&name=Saimon
    // http://ewallsnew.mediadevstaging.com/api/get_nonce/?controller=user&method=generate_auth_cookie

   
     DataService.get({route: 'get_nonce'}, {controller:'user', method:'generate_auth_cookie'}).$promise.then(function(nonceInfo) {
      DataService.get({controllerName:'user', route: 'generate_auth_cookie'}, {username:$scope.loginData.username, password:$scope.loginData.password, insecure:'cool'}).$promise.then(function(userInfo) {
        if(userInfo && userInfo.status=='ok'){
            Data.setCurrentUserInfo(userInfo)
            $state.go('user')
        }else{
            $state.go('welcome')
        }
      })  
    });

    // var queryData = DataService.get({route: 'get_recent_posts'}).$promise;         //-----ok         //XMLHttpRequest
    //    queryData.then(function(_response) {
    //     console.debug(" The data......... " + JSON.stringify(_response));
    //     // $scope.items = _response.hits;
    //   });

      // var queryData = WpJson.get({route: 'wp-api-menus', version:'v2'}).$promise;            //------ok        //Mime type -- application/json
      //  queryData.then(function(_response) {
      //   console.debug(" The data menus>>>> " + JSON.stringify(_response));
      //   // $scope.items = _response.hits;
      // });


      //  var queryData = JsonEquals.get({route:'', json:'get_page_index'}).$promise;         //-----ok         //XMLHttpRequest
      //  queryData.then(function(_response) {
      //   console.debug(" The data...new...... " + JSON.stringify(_response));
      //   // $scope.items = _response.hits;
      // });


    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('shopCtrl', function($scope, $ionicModal, $timeout, DataService, $http, WpJson, JsonEquals) {
    $scope.getMenusInfo = function(){
      var queryData = WpJson.get({route: 'wp-api-menus', version:'v2', view:'menus', id:17}).$promise;            
      queryData.then(function(_response) {
        $scope.menuItems = _response.items;
      });
    }
  })

.controller('userCtrl', function($scope, $ionicModal, $timeout, DataService, $http, WpJson, JsonEquals, Data) {
    $scope.currentUserInfo = Data.getCurrentUserInfo().user
    console.log("$scope.currentUserInfo >>>>>>>>>>>>>>"+JSON.stringify($scope.currentUserInfo))
  })


.factory('DataService', function($resource){              //XMLHttpRequest
    return $resource('http://ewallsnew.mediadevstaging.com/api/:controllerName/:route',{ callback: "JSON_CALLBACK", format:'jsonp', controller:'@controller',method:'@method', username:'@username',password:'@password', insecure:'@insecure'}, 
        { 
          'get': {
            method:'JSONP', 
            params: { 
              controllerName:"@controllerName",
              route: "@route"
            }
          },
          'save':   {method:'POST'},
          'query':  {method:'GET', isArray:true},
          'remove': {method:'DELETE'},
          'delete': {method:'DELETE'} 
        }
      );
})


.factory('WpJson', function($resource){                        //Mime type -- application/json
    return $resource('http://ewallsnew.mediadevstaging.com/wp-json/:route/:version/:view/:id',{}, 
        { 
          'get': {
            method:'GET', 
            params: { 
              route: "@route",
              version: "@version",
              view: "@view",
              id: "@id"
            }
          },
          'save':   {method:'POST'},
          'query':  {method:'GET', isArray:true},
          'remove': {method:'DELETE'},
          'delete': {method:'DELETE'} 
        }
      );
})

.factory('JsonEquals', function($resource){              //XMLHttpRequest
    return $resource('http://ewallsnew.mediadevstaging.com/:route',{ callback: "JSON_CALLBACK", format:'jsonp' }, 
        { 
          'get': {
            method:'JSONP', 
            params: { 
              route: "@route"
            }
          },
          'save':   {method:'POST'},
          'query':  {method:'GET', isArray:true},
          'remove': {method:'DELETE'},
          'delete': {method:'DELETE'} 
        }
      );
})


.factory('Data', function () {
    var data = {
        userInfo: {}
    }
    return {
        getCurrentUserInfo: function () {
            return data.userInfo;
        },
        setCurrentUserInfo: function (userInfo) {
            data.userInfo = userInfo;
        }
    }
})