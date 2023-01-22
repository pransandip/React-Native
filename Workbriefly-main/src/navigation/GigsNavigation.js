import 'react-native-gesture-handler';
import * as React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import GigList from '../screens/Gigs/GigList';

const Stack = createStackNavigator();
function GigsNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gesturesEnabled: true,
      }}>
      <Stack.Screen
        name="GigList"
        component={GigList}
        options={{animationEnabled: false}}
      />
    </Stack.Navigator>
  );
}

export default GigsNavigation;

