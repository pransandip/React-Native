import React, { useContext, useEffect } from "react";
import {
  NavigationContainer,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

import { CredentialsContext } from "../contexts/CredentialsContext";

import HomeScreen from "../screens/HomeScreen";
import MenuScreen from "../screens/MenuScreen";

import ParkingSpotList from "../screens/ParkingSpotList";
import ParkingSpotListing from "../screens/ParkingSpotListing";

import { colors } from "../components/colors/colors";
import PaymentScreen from "../screens/PaymentScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import SearchScreen from "../screens/SearchScreen";
import NewSpotsyListingScreen from "../screens/NewSpotsyListingScreen";

const { primary, darkGrey, secondary, white } = colors;

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const AppStack = () => {
  const { storedCredentials } = useContext(CredentialsContext);

  return (
    <BottomTab.Navigator
      initialRouteName="Parking Spots"
      screenOptions={{
        tabBarStyle: {
          height: 65,
          paddingBottom: 5,
          backgroundColor: primary,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "300",
          color: white,
          justifyContent: "center",
          alignItems: "center",
        },
      }}>
      <BottomTab.Screen
        name="Parking Spots"
        component={ParkingSpotList}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            let isFocused = useIsFocused();
            return (
              <Ionicons
                name="car-outline"
                color={isFocused ? secondary : white}
                size={40}
              />
            );
          },
        }}
      />

      {storedCredentials === null ? (
        <BottomTab.Screen
          name="More Info"
          component={MenuScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => {
              let isFocused = useIsFocused();
              return (
                <Ionicons
                  name="information-circle-outline"
                  color={isFocused ? secondary : white}
                  size={40}
                />
              );
            },
          }}
        />
      ) : (
        <BottomTab.Screen
          name="Menu"
          component={MenuScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => {
              let isFocused = useIsFocused();
              return (
                <Ionicons
                  name="menu-outline"
                  color={isFocused ? secondary : white}
                  size={40}
                />
              );
            },
          }}
        />
      )}
    </BottomTab.Navigator>
  );
};

const RootStack = () => {
  const { storedCredentials } = useContext(CredentialsContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {storedCredentials === null ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Spotsy"
              options={{
                headerTitleAlign: "center",
                headerTitleStyle: {
                  color: white,
                },
                headerStyle: {
                  backgroundColor: primary,
                },
                headerTintColor: white,
              }}
              component={AppStack}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Parking Spot Listing"
              component={ParkingSpotListing}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Payment Methods"
              component={PaymentScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Spotsy"
              options={{
                headerTitleAlign: "center",
                headerTitleStyle: {
                  color: white,
                },
                headerStyle: {
                  backgroundColor: primary,
                },
                headerTintColor: white,
              }}
              component={AppStack}
            />
            <Stack.Screen
              name="Parking Spot Listing"
              component={ParkingSpotListing}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Payment Methods"
              component={PaymentScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="New Spotsy Listing"
              component={NewSpotsyListingScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
