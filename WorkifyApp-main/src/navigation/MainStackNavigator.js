import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import login from '../screens/Login';
import Signup from '../screens/Signup';
import Landing from '../screens/Landing/Landing';
import ForgotPassword from '../screens/ForgotPassword';
import SignupForm from '../screens/SignupForm';
import EmailVerification from '../screens/EmailVerification';
import ResetPassword from '../screens/ResetPassword';
import DashboardNavigation from './DashboardNavigation';
import Splash from '../screens/Splash';
import SignupEmailVerification from '../screens/SignupEmailVerification';
import SignupSuccess from '../screens/SignupSuccess';
import Tabs from './Tabs';
import Profile from '../screens/Accounts/Profile';
import ChangePassword from '../screens/Accounts/ChangePassword';
import ProfileSetupNavigation from './ProfileSetupNavigation';
import HomeGigs from '../screens/Dashboard/HomeGigs';
import GigDetails from '../screens/Gigs/GigDetails';
import ReportAnIssue from '../screens/common/ReportAnIssue';
import SettingsNavigation from './SettingsNavigation';
import Survey from '../screens/survey/Survey';

const Stack = createStackNavigator();
export default class MainStackNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Login" component={login} />
          <Stack.Screen name="BottomTab" component={Tabs} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="SignupForm" component={SignupForm} />
          <Stack.Screen
            name="EmailVerification"
            component={EmailVerification}
          />
          <Stack.Screen name="HomeGigs" component={HomeGigs} />
          <Stack.Screen
            name="SignupEmailVerification"
            component={SignupEmailVerification}
          />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="SignupSuccess" component={SignupSuccess} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen
            name="ProfileSetupNavigation"
            component={ProfileSetupNavigation}
          />
          <Stack.Screen name="GigDetails" component={GigDetails} />
          <Stack.Screen name="ReportAnIssue" component={ReportAnIssue} />

          <Stack.Screen name="Settings" component={SettingsNavigation} />
          <Stack.Screen name="Survey" component={Survey} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
