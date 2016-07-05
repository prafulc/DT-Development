/*angular.module('starter.controllers', [])


*/




// angular.module('app', [])
// .controller('Controller', function($scope, $http)
// {
// 	$http.get(URL).then(function(resp){
// 		console.log('Success', resp); 
// 	}, function(err){
// 		console.error('ERR', err);
// 	})
// })

// angular.module('ionicApp', ['ionic','ngResource'])
//   .value('nutritionixConst', {
//   'appId' :'8abbcd8e',
//   'appKey' : '36e8d264537037ee7e832a41902ffe57'
// })

//   .controller('HomeCtrl', function($scope, DataService,DataServiceHTTP, Weather) {

//   $scope.data = {searchKey:''};

//   $scope.getItemHeight = function(item, index) {
    
//     return (index % 2) === 0 ? 50 : 60;
//   };

 
//   $scope.doSearch = function() {
//     console.debug("Searching for: " +  $scope.data.searchKey);

//     if ( true ) {

     
//       var promise = DataService.getAll( { 
//         'term' : $scope.data.searchKey, 
//         'results':'0:50',     
       
//       }).$promise;
//       promise.then(function(_response) {
//         console.debug(" The data " + JSON.stringify(_response));
//         $scope.items = _response.hits;
//       });

//     } else {
     
//       var promise = DataServiceHTTP.getAll($scope.data.searchKey);
//       promise.then(function(_response) {
//         console.debug(" The data " + JSON.stringify(_response.data));
//         $scope.items = _response.data.hits;
//       });
//     }
//   };
// })

//   .factory('DataService', function( $resource, nutritionixConst){
//   var aSearchObject = $resource('https://api.nutritionix.com/v1_1/search/:term',{term: '@term'},{
//     getAll : {
//       method : 'get',
    
//       params : {
//         results  : ':results',
//         appId : nutritionixConst.appId,
//         appKey  :nutritionixConst.appKey,
       
//         fields : ':fields',
//       }
//     }
//   });
//   return {
    
//     getAll : function(_params) {
//       var defaultFields = 'brand_id,item_name,item_id,brand_name,nf_calories,nf_total_fat';

//       if (!_params.fields) {
//         _params.fields = defaultFields;
//       }
//       return aSearchObject.getAll(_params);             
//     }
//   }

// })
// /**
// *
// */
//   .factory('DataServiceHTTP', function( $http, nutritionixConst){
//   return {
//     getAll : function(_key) {

//       return $http.get('https://api.nutritionix.com/v1_1/search/' + _key,{
//         'params' : {
//           results  : '0:50',
//           appId : nutritionixConst.appId,
//           appKey  :nutritionixConst.appKey,
          
//           fields : 'brand_id,item_name,item_id,brand_name,nf_calories,nf_total_fat'
//         }
//       });
//     }
//   }
// })

//   .factory('Weather', function($resource) {

//   var API_PATH = 'http://api.openweathermap.org/data/2.5/weather';

//   var Weather = $resource(API_PATH);

//   return {
//     getWeather: function(weatherParams) {
//       return Weather.get(weatherParams, function(successResult) {
//         return successResult;
//       }, function(errorResult) {
//         console.log(errorResult);
//       });             
//     }
//   }
// })
//   .config(function($stateProvider, $urlRouterProvider) {
//   $stateProvider
//     .state('index', {
//     url: '/',
//     templateUrl: 'home.html',
//     controller : 'HomeCtrl'
//   });

//   $urlRouterProvider.otherwise("/");
// });