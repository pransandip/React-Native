import 'react-native-gesture-handler';
import * as React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import StaffList from '../screens/Staff/StaffList';

const Stack = createStackNavigator();
function StaffNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gesturesEnabled: true,
      }}>
      <Stack.Screen
        name="StaffList"
        component={StaffList}
        options={{animationEnabled: false}}
      />
    </Stack.Navigator>
  );
}

export default StaffNavigation;

