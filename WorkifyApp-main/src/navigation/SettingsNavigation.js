import 'react-native-gesture-handler';
import * as React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import Settings from '../screens/settings/Settings';

const Stack = createStackNavigator();
function SettingsNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gesturesEnabled: true,
      }}>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{animationEnabled: false}}
      />
    </Stack.Navigator>
  );
}

export default SettingsNavigation;
