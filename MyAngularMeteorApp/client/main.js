import angular from 'angular';
import angularMeteor from 'angular-meteor';
import myHomeComponent from '../imports/ui/components/myHome';
import myNavigation from '../imports/ui/components/navigation/navigation';


angular.module('my-app', [
	angularMeteor,
	myNavigation.name,
	myHomeComponent.name
	//,
]); 
/*angular.module('simple-app', [
  angularMeteor,
  todosList.name
]);*/