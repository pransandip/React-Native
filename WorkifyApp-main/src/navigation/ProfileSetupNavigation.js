import 'react-native-gesture-handler';
import * as React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import ProfileSetup from '../screens/AccountSetup/ProfileSetup';
import AddExprience from '../screens/AccountSetup/AddExprience';
import AddCertificate from '../screens/AccountSetup/AddCertificate';
import AddProfilePicture from '../screens/AccountSetup/AddProfilePicture';
import AddPhotoVerify from '../screens/AccountSetup/AddPhotoVerify';
import AddBackgroundVerification from '../screens/AccountSetup/AddBackgroundVerification';
import AddPreferences from '../screens/AccountSetup/AddPreferences';
import ExprienceSuccess from '../screens/AccountSetup/ExprienceSuccess';
import CertificateSuccess from '../screens/AccountSetup/CertificateSuccess';
import PreferenceSuccess from '../screens/AccountSetup/PreferenceSuccess';

const Stack = createStackNavigator();
function ProfileSetupNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gesturesEnabled: true,
      }}>
      <Stack.Screen
        name="ProfileSetup"
        component={ProfileSetup}
        options={{animationEnabled: false}}
      />
      <Stack.Screen
        name="AddExprience"
        component={AddExprience}
        options={{animationEnabled: false}}
      />
      <Stack.Screen
        name="AddCertificate"
        component={AddCertificate}
        options={{animationEnabled: false}}
      />
      <Stack.Screen
        name="AddPreferences"
        component={AddPreferences}
        options={{animationEnabled: false}}
      />
      <Stack.Screen
        name="AddProfilePicture"
        component={AddProfilePicture}
        options={{animationEnabled: false}}
      />
      <Stack.Screen
        name="AddPhotoVerify"
        component={AddPhotoVerify}
        options={{animationEnabled: false}}
      />
      <Stack.Screen
        name="AddBackgroundVerification"
        component={AddBackgroundVerification}
        options={{animationEnabled: false}}
      />
      <Stack.Screen
        name="ExprienceSuccess"
        component={ExprienceSuccess}
        options={{animationEnabled: false}}
      />
      <Stack.Screen
        name="CertificateSuccess"
        component={CertificateSuccess}
        options={{animationEnabled: false}}
      />
      <Stack.Screen
        name="PreferenceSuccess"
        component={PreferenceSuccess}
        options={{animationEnabled: false}}
      />
    </Stack.Navigator>
  );
}

export default ProfileSetupNavigation;
