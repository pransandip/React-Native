import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Landing from '../screens/Landing/Landing';
import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import EmailVerification from '../screens/EmailVerification';
import ResetPassword from '../screens/ResetPassword';
import Agreement from '../screens/Agreement';
import Signup from '../screens/Signup';
import Splash from '../screens/Splash';
import SignupEmailVerification from '../screens/SignupEmailVerification';
import SignupSuccess from '../screens/SignupSuccess';
import Tabs from './Tabs';
import Profile from '../screens/Accounts/Profile';
import ChangePassword from '../screens/Accounts/ChangePassword';
// import CreateAGig from '../screens/Gigs/CreateAGig';
import CreateAGig from '../screens/createGig/CreateAGig';
import AddStaff from '../screens/Staff/AddStaff';
import Staff from '../screens/Staff/Staff';
import GigDetails from '../screens/Gigs/GigDetails';
import HelpAndSupport from '../screens/helpAndSupport/HelpAndSupport';
import EditStaff from '../screens/Staff/EditStaff';
import EditGig from '../screens/createGig/EditGig';

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
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="BottomTab" component={Tabs} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen
            name="EmailVerification"
            component={EmailVerification}
          />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="Agreement" component={Agreement} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen
            name="SignupEmailVerification"
            component={SignupEmailVerification}
          />
          <Stack.Screen name="SignupSuccess" component={SignupSuccess} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="H1elpAndSupport" component={HelpAndSupport} />
          {/* <Stack.Screen name='CreateAGig' component={CreateAGig}/> */}
          <Stack.Screen name="CreateAGig" component={CreateAGig} />
          <Stack.Screen name="AddStaff" component={AddStaff} />
          <Stack.Screen name="EditStaff" component={EditStaff} />
          <Stack.Screen name="EditGig" component={EditGig} />

          <Stack.Screen name="Staff" component={Staff} />
          <Stack.Screen name="GigDetails" component={GigDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
