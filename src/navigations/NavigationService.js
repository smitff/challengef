import {NavigationActions,StackActions} from '@react-navigation/native';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
	_navigator = navigatorRef;
}

function navigate(routeName, params) {
	_navigator.navigate(routeName,params);
}

function replace(routeName, params) {
	_navigator.dispatch(StackActions.replace(routeName, params));
	// StackActions.replace(routeName,params);
}

function goBack() {
	_navigator.dispatch(NavigationActions.back());
}


export default {
	navigate,
	replace,
	setTopLevelNavigator,
	goBack,
};