import 'react-native-gesture-handler';
import * as React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Dashboard from '../screens/Dashboard/Dashboard';

const Stack = createStackNavigator();
function DashboardNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gesturesEnabled: true,
      }}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{animationEnabled: false}}
      />
    </Stack.Navigator>
  );
}

export default DashboardNavigation;
