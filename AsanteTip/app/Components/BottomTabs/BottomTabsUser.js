import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {COLORS} from '../../Constants/Colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ScanQR from '../../screens/scanQR/ScanQR';
import Wallet from '../../screens/Wallet/Wallet';
import SettingsUser from '../../screens/Settings/SettingsUser';
import HomeUser from '../../screens/Home/HomeUser';

const Tab = createBottomTabNavigator();

const BottomTabsUser = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        // headerShown: false,
        keyboardHidesTabBar: true,
      }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 80,
          backgroundColor: COLORS.socialBtnColor,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeUser}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBar}>
              <Image
                resizemode="contain"
                source={require('../../assets/TabIcons/home.png')}
              />
              <Image
                resizemode="contain"
                source={
                  focused
                    ? require('../../assets/TabIcons/indicator.png')
                    : null
                }
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsUser}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBar}>
              <Image
                resizemode="contain"
                source={require('../../assets/TabIcons/setting.png')}
              />
              <Image
                resizemode="contain"
                source={
                  focused
                    ? require('../../assets/TabIcons/indicator.png')
                    : null
                }
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ScanQR"
        component={ScanQR}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBar}>
              <Image
                styles={{marginBottom: moderateScale(50)}}
                resizemode="contain"
                source={require('../../assets/TabIcons/coin.png')}
              />
              <Image
                resizemode="contain"
                source={
                  focused
                    ? require('../../assets/TabIcons/indicator.png')
                    : null
                }
                style={{marginTop: 8}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="wallet"
        component={Wallet}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBar}>
              <Image
                source={require('../../assets/TabIcons/wallet.png')}
                // style={{
                //   height: 27,
                //   width: 27,
                //   resizeMode: 'cover',
                // }}
              />
              <Image
                resizemode="contain"
                source={
                  focused
                    ? require('../../assets/TabIcons/indicator.png')
                    : null
                }
                style={{marginTop: 5}}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsUser;

const styles = StyleSheet.create({
  tabBar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasker_logo: {
    height: moderateScale(40),
    width: moderateScale(40),
  },
});
