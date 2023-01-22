import React, {Component, useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Image, Text} from 'react-native';
import Axios, {URL} from '../api/Axios';
import DashboardNavigation from './DashboardNavigation';
import GigsNavigation from './GigsNavigation';
import AccountNavigation from './AccountNavigation';
import Home from '../../assets/home.png';
import Gig from '../../assets/gig.png';
import Oval from '../../assets/oval.png';
import AsyncStorage from '@react-native-community/async-storage';
import GigDetails from '../screens/Gigs/GigDetails';
import GigList from '../screens/Gigs/GigList';

const Tab = createBottomTabNavigator();
const Tabs = () => {
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then((value) => {
      let objValue = JSON.parse(value);
      setUserData(objValue);
    });
    AsyncStorage.getItem('token').then((value) => {
      setToken(value);
    });
  });

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          height: 80,
        },
        labelStyle: {
          fontSize: 12,
          fontWeight: '400',
          lineHeight: 14,
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
              <Image
                source={Home}
                style={{
                  height: 26,
                  width: 26,
                  tintColor: focused ? '#002E6D' : '#8A8A8A',
                }}
              />
              <Text
                style={{color: focused ? '#002E6D' : '#8A8A8A', marginTop: 5}}>
                Home
              </Text>
            </View>
          ),
        }}
        component={DashboardNavigation}
      />
      {/* <Tab.Screen
        name="Gig"
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
              <Image
                source={Gig}
                style={{
                  height: 26,
                  width: 26,
                }}
              />
              <Text style={{color: '#8A8A8A', marginTop: 5}}>Gigs</Text>
            </View>
          ),
        }}
        component={GigsNavigation}
      /> */}

      <Tab.Screen
        name="Gig"
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
              <Image
                source={Gig}
                style={{
                  height: 26,
                  width: 26,
                  tintColor: focused ? '#002E6D' : '#8A8A8A',
                }}
              />
              <Text
                style={{color: focused ? '#002E6D' : '#8A8A8A', marginTop: 5}}>
                Gigs
              </Text>
            </View>
          ),
        }}
        component={GigList}
      />

      <Tab.Screen
        name="Account"
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
              {userData?.profile_picture ? (
                <Image
                  source={{
                    uri:
                      `${URL}/profile/profile_picture/` +
                      userData.profile_picture,
                  }}
                  style={{
                    height: 26,
                    width: 26,
                    borderRadius: 26,
                  }}
                />
              ) : (
                <Image
                  source={Oval}
                  style={{
                    height: 26,
                    width: 26,
                  }}
                />
              )}
              <Text
                style={{color: focused ? '#002E6D' : '#8A8A8A', marginTop: 5}}>
                Account
              </Text>
            </View>
          ),
        }}
        component={AccountNavigation}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
