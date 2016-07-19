import angular from 'angular';
import angularMeteor from 'angular-meteor';
import myHomeComponent from '../imports/ui/components/myHome';
import myNavigation from '../imports/ui/components/navigation/navigation';
import Games from '../imports/ui/components/games/games';
import Bikes from '../imports/ui/components/bikes/bikes';
import Registration from '../imports/ui/components/registration/registration';
import ChangePassword from '../imports/ui/components/user-account/changePassword';
import ForgotPassword from '../imports/ui/components/user-account/forgotPassword';
import ResetPassword from '../imports/ui/components/user-account/resetPassword';

angular.module('my-app', [
	angularMeteor,
	myNavigation.name,
	myHomeComponent.name,
	Games.name,
	Bikes.name,
	Registration.name,
	ChangePassword.name,
	ForgotPassword.name,
	ResetPassword.name
]); 
/*angular.module('simple-app', [
  angularMeteor,
  todosList.name
]);*/