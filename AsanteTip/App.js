/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Navigation from './app/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Root} from 'native-base';
import BusinessLogin from './app/screens/auth/BusinessLogin';
import Login from './app/screens/auth/Login';

import SignIn from './app/screens/auth/SignIn';
import BusinessSignIn from './app/screens/auth/BusinessSignIn';
import PersonalInformation from './app/screens/information/PersonalInformation';
import BusinessInformation from './app/screens/information/BusinessInformation';
import CardBankSetup from './app/screens/cardBank/CardBankSetup';
import SettingsBusiness from './app/screens/Settings/SettingsBusiness';
import AddEmployee from './app/screens/addEmployee/AddEmployee';
import QRCodeUser from './app/screens/QRCode/QRCodeUser';
import EditEmployee from './app/screens/editEmployee/EditEmployee';
import BusinessStatement from './app/screens/businessStatement/BusinessStatement';
import HomeBusiness from './app/screens/Home/HomeBusiness';
import BottomTabsBusiness from './app/Components/BottomTabs/BottomTabsBusiness';
import BottomTabsUser from './app/Components/BottomTabs/BottomTabsUser';
import ScanQR from './app/screens/scanQR/ScanQR';
import Wallet from './app/screens/Wallet/Wallet';
import TermsAndConditions from './app/screens/terms&Conditions/TermsAndConditions';
import QRCodeBusiness from './app/screens/QRCode/QRCodeBusiness';
import HomeUser from './app/screens/Home/HomeUser';
import PaymentSettings from './app/screens/paymentSettings/PaymentSettings';
import ProfileSettings from './app/screens/profileSettings/ProfileSettings';
import SingleTip from './app/screens/singleTip/SingleTip';
import MultipleTip from './app/screens/multipleTip/MultipleTip';
import ReceiveTip from './app/screens/receiveTip/ReceiveTip';
import TransferToBank from './app/screens/transferToBank/TransferToBank';
import ScanQRStack from './app/screens/scanQR/ScanQRStack';
import BalanceAndStatement from './app/screens/balanceAndStatement/BalanceAndStatement';
import Statement from './app/screens/statement/Statement';
import AuthService from './app/Service/AuthService';
import {useSelector, useDispatch} from 'react-redux';
import {setuser} from './app/Redux/reducer/User';
import ForgotPass from './app/screens/auth/ForgotPass';
import SingleTipAmount from './app/screens/enterAmount/SingleTipAmount';
import MultipleTipAmount from './app/screens/enterAmount/MultipleTipAmount';
import AddBankAccount from './app/screens/addBankAccount/AddBankAccount';
import CustomTipAmount from './app/screens/enterAmount/CustomTipAmount';
import Cards from './app/screens/cards/Cards';

const Stack = createNativeStackNavigator();

const App = () => {
  const {login_status} = useSelector(state => state.User);
  const {userData} = useSelector(state => state.User);
  // console.log('userData=====', userData);
  const dispatch = useDispatch();
  useEffect(() => {
    initUserData();
  }, []);

  const initUserData = async () => {
    let result = await AuthService.getAccount();
    if (result) {
      dispatch(setuser(result));
    }
  };
  return (
    // Screens inside navigation

    // <View>
    //   {/* <PersonalInformation /> */}
    //   {/* <PaymentSettings /> */}
    //   {/* <BusinessInformation /> */}
    //   {/* <ForgotPass /> */}
    //   {/* <CardBankSetup /> */}
    //   {/* <CustomTipAmount /> */}
    // </View>

    <Root>
      <NavigationContainer ref={r => Navigation.setTopLevelNavigator(r)}>
        <Stack.Navigator
          initialRouteName="Login"
          // headerMode="none"
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            gestureDirection: 'horizontal',

            // ...TransitionPresets.SlideFromRightIOS,
          }}>
          {!login_status ? (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="BusinessLogin" component={BusinessLogin} />
              <Stack.Screen name="BusinessSignIn" component={BusinessSignIn} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen
                name="PersonalInformation"
                component={PersonalInformation}
              />

              <Stack.Screen name="ForgotPass" component={ForgotPass} />
              <Stack.Screen
                name="BusinessInformation"
                component={BusinessInformation}
              />
            </>
          ) : userData.type == 'bussiness' ? (
            <>
              <Stack.Screen
                name="HomeBusiness"
                component={BottomTabsBusiness}
              />
              <Stack.Screen name="AddEmployee" component={AddEmployee} />
              <Stack.Screen
                name="BusinessStatement"
                component={BusinessStatement}
              />
              <Stack.Screen
                name="ProfileSettings"
                component={ProfileSettings}
              />
              <Stack.Screen name="EditEmployee" component={EditEmployee} />
              <Stack.Screen name="QRCodeBusiness" component={QRCodeBusiness} />
              <Stack.Screen name="TransferToBank" component={TransferToBank} />
              <Stack.Screen name="ReceiveTip" component={ReceiveTip} />
              <Stack.Screen name="Wallet" component={Wallet} />
              <Stack.Screen name="SingleTip" component={SingleTip} />
              <Stack.Screen name="MultipleTip" component={MultipleTip} />
              <Stack.Screen
                name="SingleTipAmount"
                component={SingleTipAmount}
              />
              <Stack.Screen name="ScanQRStack" component={ScanQRStack} />
              <Stack.Screen
                name="MultipleTipAmount"
                component={MultipleTipAmount}
              />
              <Stack.Screen
                name="CustomTipAmount"
                component={CustomTipAmount}
              />
              <Stack.Screen
                name="TermsAndConditions"
                component={TermsAndConditions}
              />
              <Stack.Screen name="AddBankAccount" component={AddBankAccount} />
              <Stack.Screen name="QRCodeUser" component={QRCodeUser} />
              <Stack.Screen name="cardBankSetup" component={CardBankSetup} />
              <Stack.Screen name="ForgotPass" component={ForgotPass} />
              <Stack.Screen name="Cards" component={Cards} />
              <Stack.Screen
                name="PaymentSettings"
                component={PaymentSettings}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="HomeUser" component={BottomTabsUser} />
              <Stack.Screen
                name="PaymentSettings"
                component={PaymentSettings}
              />

              <Stack.Screen name="cardBankSetup" component={CardBankSetup} />
              <Stack.Screen
                name="TermsAndConditions"
                component={TermsAndConditions}
              />
              <Stack.Screen
                name="ProfileSettings"
                component={ProfileSettings}
              />
              <Stack.Screen name="QRCodeUser" component={QRCodeUser} />
              <Stack.Screen name="SingleTip" component={SingleTip} />
              <Stack.Screen name="MultipleTip" component={MultipleTip} />
              <Stack.Screen name="ReceiveTip" component={ReceiveTip} />
              <Stack.Screen name="TransferToBank" component={TransferToBank} />
              <Stack.Screen name="Wallet" component={Wallet} />
              <Stack.Screen name="ScanQRStack" component={ScanQRStack} />
              <Stack.Screen name="Statement" component={Statement} />
              <Stack.Screen
                name="BalanceAndStatement"
                component={BalanceAndStatement}
              />
              <Stack.Screen name="ForgotPass" component={ForgotPass} />
              <Stack.Screen
                name="SingleTipAmount"
                component={SingleTipAmount}
              />

              <Stack.Screen
                name="MultipleTipAmount"
                component={MultipleTipAmount}
              />
              <Stack.Screen
                name="CustomTipAmount"
                component={CustomTipAmount}
              />
              <Stack.Screen name="AddBankAccount" component={AddBankAccount} />
              <Stack.Screen name="Cards" component={Cards} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  );
};

export default App;
