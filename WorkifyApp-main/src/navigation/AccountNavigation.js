import 'react-native-gesture-handler';
import * as React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Accounts from '../screens/Accounts/Accounts';

const Stack = createStackNavigator();
function AccountNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gesturesEnabled: true,
      }}>
      <Stack.Screen
        name="Account"
        component={Accounts}
        options={{animationEnabled: false}}
      />
    </Stack.Navigator>
  );
}

export default AccountNavigation;

