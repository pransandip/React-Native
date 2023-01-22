import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../Constants/Colors';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {Icon} from 'native-base';
import Navigation from '../../Navigation';
import {logout} from '../../Redux/reducer/User';
import Toast from 'react-native-simple-toast';
import AuthService from '../../Service/AuthService';
import {useDispatch} from 'react-redux';

const {height, width} = Dimensions.get('window');

const SettingsUser = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    AuthService.logout();
    Toast.show('Log out Successfully!!!');
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
        hidden={false}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#CCD6FB', '#EAF0FB']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.bgGradient}>
          <View style={styles.topView}>
            <Text style={styles.headingTxt}>AsanteTip</Text>

            <View style={styles.neomorphImgView}>
              <Neomorph
                inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphImg}>
                <Icon
                  name="arrowleft"
                  onPress={() => Navigation.back()}
                  type="AntDesign"
                  style={styles.arrowLeft}
                />
              </Neomorph>
              <Text style={styles.settingsTxt}>Settings</Text>
            </View>

            <Pressable
              onPress={() => Navigation.navigate('PaymentSettings')}
              style={styles.neomorphListView}>
              <NeomorphFlex
                // inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphLogo}>
                <Image
                  source={require('../../assets/payment1.png')}
                  //   style={styles.settingsImg}
                />
              </NeomorphFlex>

              <NeomorphFlex
                // inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphList}>
                <View style={styles.neomorphTxtView}>
                  <View style={styles.txtView}>
                    <Text style={styles.topTxt}>Payment Settings</Text>
                    <Text style={styles.bottomTxt}>
                      UPI, Linked Bank Accounts, Cards, Wallet, Automatic
                      Payments & Subscriptions
                    </Text>
                  </View>

                  <Icon
                    name="angle-right"
                    type="Fontisto"
                    style={styles.rightIcon}
                  />
                </View>
              </NeomorphFlex>
            </Pressable>

            <Pressable
              onPress={() => Navigation.navigate('ProfileSettings')}
              style={styles.neomorphListView}>
              <NeomorphFlex
                // inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphLogo}>
                <Image
                  source={require('../../assets/userProfile.png')}
                  style={styles.settingsImg}
                />
              </NeomorphFlex>

              <NeomorphFlex
                // inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphList}>
                <View style={styles.neomorphTxtView}>
                  <View style={styles.txtView}>
                    <Text style={styles.topTxt}>Profile Settings</Text>
                    <Text style={styles.bottomTxt}>
                      Profile, Addresses, Security & Privacy, Notifications,
                      Language
                    </Text>
                  </View>

                  <Icon
                    name="angle-right"
                    type="Fontisto"
                    style={styles.rightIcon}
                  />
                </View>
              </NeomorphFlex>
            </Pressable>

            <Pressable
              onPress={() => Navigation.navigate('TermsAndConditions')}
              style={styles.neomorphListView}>
              <NeomorphFlex
                // inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphLogo}>
                <Image
                  source={require('../../assets/logout.png')}
                  style={styles.settingsImg}
                />
              </NeomorphFlex>

              <NeomorphFlex
                // inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphList}>
                <View style={styles.neomorphTxtView}>
                  <View style={styles.txtView}>
                    <Text style={styles.topTxt}>Terms and Conditions</Text>
                    <Text style={styles.bottomTxt}>
                      Terms and conditions related to using this App
                    </Text>
                  </View>

                  <Icon
                    name="angle-right"
                    type="Fontisto"
                    style={styles.rightIcon}
                  />
                </View>
              </NeomorphFlex>
            </Pressable>

            <Pressable
              onPress={() => Navigation.navigate('Cards')}
              style={styles.neomorphListView}>
              <NeomorphFlex
                // inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphLogo}>
                <Icon
                  name="credit-card"
                  type="EvilIcons"
                  style={[styles.profileIcon, {fontSize: moderateScale(40)}]}
                />
              </NeomorphFlex>

              <NeomorphFlex
                // inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphList}>
                <View style={styles.neomorphTxtView}>
                  <View style={styles.txtView}>
                    <Text style={styles.topTxt}>All Cards</Text>
                    <Text style={styles.bottomTxt}>
                      Credit Cards, Debit Cards
                    </Text>
                  </View>

                  <Icon
                    name="angle-right"
                    type="Fontisto"
                    style={styles.rightIcon}
                  />
                </View>
              </NeomorphFlex>
            </Pressable>

            <Pressable
              onPress={() => Navigation.navigate('QRCodeUser')}
              style={styles.neomorphListView}>
              <NeomorphFlex
                // inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphLogo}>
                {/* <Image
                  source={require('../../assets/logout.png')}
                  style={styles.settingsImg}
                /> */}

                <Icon
                  name="user-o"
                  type="FontAwesome"
                  style={styles.profileIcon}
                />
              </NeomorphFlex>

              <NeomorphFlex
                // inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphList}>
                <View style={styles.neomorphTxtView}>
                  <View style={styles.txtView}>
                    <Text style={styles.topTxt}>My Profile</Text>
                    <Text style={styles.bottomTxt}>
                      Personal Information, QR Code, ID
                    </Text>
                  </View>

                  <Icon
                    name="angle-right"
                    type="Fontisto"
                    style={styles.rightIcon}
                  />
                </View>
              </NeomorphFlex>
            </Pressable>

            <Pressable
              // onPress={() => Navigation.navigate('cardBankSetup')}
              onPress={handleLogout}
              style={styles.loginBtn}>
              <NeomorphFlex
                // inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphbtn}>
                <LinearGradient
                  colors={['#7E8BEE', '#5E6FE4']}
                  start={{x: 0.3, y: 0}}
                  end={{x: 0.7, y: 1}}
                  style={styles.btnGradient}>
                  <Text style={styles.loginTxt}>Logout</Text>
                  <Image
                    source={require('../../assets/logout1.png')}
                    style={styles.logoutImage}
                  />
                </LinearGradient>
              </NeomorphFlex>
            </Pressable>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default SettingsUser;

const styles = StyleSheet.create({
  bgGradient: {
    flex: 1,
    // height: height + StatusBar.currentHeight,
    // width: width,
  },
  topView: {
    marginTop: verticalScale(40),
    paddingHorizontal: moderateScale(34),
    // backgroundColor: 'red',
  },

  headingTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.black,
    alignSelf: 'center',
    fontSize: moderateScale(30),
  },
  neomorphImgView: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(30),
    flexDirection: 'row',
    // alignItems: 'center',
    width: width,
    // paddingStart: moderateScale(20),
  },
  neomorphImg: {
    shadowRadius: moderateScale(2),
    // shadowOpacity: moderateScale(0.2),
    borderRadius: moderateScale(25),
    backgroundColor: COLORS.statusBar,
    width: moderateScale(35),
    height: moderateScale(35),
    borderRadius: moderateScale(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowLeft: {
    color: COLORS.blueGrey,
    fontSize: moderateScale(18),
  },
  settingsTxt: {
    fontFamily: 'Playfair-Display',
    color: COLORS.lovePurple,
    fontSize: moderateScale(20),
    paddingStart: moderateScale(15),
  },
  neomorphListView: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  neomorphList: {
    shadowRadius: moderateScale(10),
    // shadowOpacity: moderateScale(0.2),
    borderRadius: moderateScale(20),
    backgroundColor: COLORS.socialBtnColor,
    // width: width - 40,
    height: verticalScale(70),
    justifyContent: 'center',
    // marginBottom: verticalScale(10),
    // borderRadius: moderateScale(100),
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  neomorphLogo: {
    shadowRadius: moderateScale(2),
    // shadowOpacity: moderateScale(0.2),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.socialBtnColor,
    width: moderateScale(50),
    height: moderateScale(50),
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    // marginBottom: verticalScale(20),
    // borderRadius: moderateScale(100),
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  settingsImg: {
    height: moderateScale(250),
    width: moderateScale(250),
  },
  profileIcon: {
    fontSize: moderateScale(28),
    color: '#3B4F7D',
  },
  neomorphTxtView: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: '80%',

    alignSelf: 'flex-end',
    justifyContent: 'space-around',
  },
  txtView: {
    width: '70%',
  },
  topTxt: {
    fontFamily: 'Quicksand',
    fontSize: moderateScale(15),
    color: COLORS.lovePurple,
    fontWeight: '600',
  },
  bottomTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.lovePurple,
    fontSize: moderateScale(10),
  },
  rightIcon: {
    color: COLORS.blueGrey,
  },
  loginBtn: {
    width: '75%',
    alignSelf: 'center',
    borderRadius: moderateScale(25),
    // paddingHorizontal: moderateScale(30),
    height: verticalScale(65),
    marginVertical: verticalScale(30),
  },
  btnGradient: {
    height: '100%',
    justifyContent: 'space-evenly',
    paddingHorizontal: moderateScale(60),
    alignItems: 'center',
    borderRadius: moderateScale(25),
    flexDirection: 'row',
    alignItems: 'center',
  },
  neomorphbtn: {
    shadowRadius: moderateScale(5),
    borderRadius: moderateScale(25),
    backgroundColor: 'transparent',
    borderWidth: 1,
    // backgroundColor: COLORS.white,
    borderColor: COLORS.white,
  },
  loginTxt: {
    fontFamily: 'Playfair-Display',
    color: COLORS.white,
    fontSize: moderateScale(18),
  },
  logoutImage: {
    marginTop: verticalScale(12),
  },
});
