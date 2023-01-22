import {
  NavigationActions,
  DrawerActions,
  CommonActions,
} from '@react-navigation/native';

let _navigator;

function setTopLevelNavigator(r) {
  _navigator = r;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: params,
    }),
  );
}

function openDrawer() {
  _navigator.dispatch(DrawerActions.openDrawer());
  // navigation.dispatch(DrawerActions.openDrawer())
}
function closeDrawer() {
  _navigator.dispatch(DrawerActions.closeDrawer());
}

function back() {
  _navigator.dispatch(CommonActions.goBack());
}

export default {
  navigate,
  setTopLevelNavigator,
  openDrawer,
  closeDrawer,
  back,
};
