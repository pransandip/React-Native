import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Pressable,
  Image,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../Constants/Colors';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {
  Neomorph,
  NeomorphFlex,
  ShadowFlex,
} from 'react-native-neomorph-shadows';
import {Icon} from 'native-base';
import Navigation from '../../Navigation';
import AuthService from '../../Service/AuthService';

const {height, width} = Dimensions.get('window');
const HomeUser = () => {
  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    let result = await AuthService.getAccount();
    console.log(`User Details--------->`, result);
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
        hidden={false}
      />

      <LinearGradient
        colors={['#CCD6FB', '#EAF0FB']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.bgGradient}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.topView}>
            <Text style={styles.headingTxt}>AsanteTip</Text>
            <Text style={styles.settingsTxt}>Home</Text>

            <NeomorphFlex
              // inner // <- enable shadow inside of neomorph
              swapShadows // <- change zIndex of each shadow color
              style={styles.centerCard}>
              <LinearGradient
                colors={['#EAF0FB', '#CCD6FB']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 1}}
                style={styles.cardGradient}>
                <View style={styles.innerCardView}>
                  <Text style={styles.settingsTxt}>Tip Box</Text>

                  <View style={styles.shadowBtnView}>
                    <Pressable
                      onPress={() => Navigation.navigate('SingleTip', {id: ''})}
                      style={styles.btnView}>
                      <NeomorphFlex
                        // inner // <- enable inner shadow
                        useArt // <- set this prop to use non-native shadow on ios
                        style={styles.shadowBtn}>
                        <Image
                          source={require('../../assets/user.png')}
                          style={{
                            height: moderateScale(30),
                            width: moderateScale(30),
                          }}
                        />
                      </NeomorphFlex>
                      <Text style={styles.tipBoxTxt}>Single Tip</Text>
                    </Pressable>

                    <Pressable
                      onPress={() =>
                        Navigation.navigate('MultipleTip', {id: ''})
                      }
                      style={styles.btnView}>
                      <NeomorphFlex
                        // inner // <- enable inner shadow
                        useArt // <- set this prop to use non-native shadow on ios
                        style={styles.shadowBtn}>
                        <Image
                          source={require('../../assets/people.png')}
                          style={{
                            height: moderateScale(35),
                            width: moderateScale(35),
                          }}
                        />
                      </NeomorphFlex>
                      <Text style={styles.tipBoxTxt}>Multiple Tip</Text>
                    </Pressable>

                    <Pressable
                      onPress={() => Navigation.navigate('ReceiveTip')}
                      style={styles.btnView}>
                      <NeomorphFlex
                        // inner // <- enable inner shadow
                        useArt // <- set this prop to use non-native shadow on ios
                        style={styles.shadowBtn}>
                        <Image
                          source={require('../../assets/wallet.png')}
                          style={{
                            height: moderateScale(40),
                            width: moderateScale(40),
                          }}
                        />
                      </NeomorphFlex>
                      <Text
                        style={[
                          styles.tipBoxTxt,
                          // {marginTop: verticalScale(15)},
                        ]}>
                        Receive Tip
                      </Text>
                    </Pressable>
                  </View>

                  <View style={styles.shadowBtnView}>
                    <Pressable
                      onPress={() => Navigation.navigate('TransferToBank')}
                      style={styles.btnView}>
                      <NeomorphFlex
                        // inner // <- enable inner shadow
                        useArt // <- set this prop to use non-native shadow on ios
                        style={styles.shadowBtn}>
                        <Image
                          source={require('../../assets/bankSmall.png')}
                          style={{
                            height: moderateScale(40),
                            width: moderateScale(40),
                          }}
                        />
                      </NeomorphFlex>
                      <Text style={styles.tipBoxTxt}>Transfer to Bank</Text>
                    </Pressable>

                    <Pressable
                      onPress={() => Navigation.navigate('Wallet')}
                      style={styles.btnView}>
                      <NeomorphFlex
                        // inner // <- enable inner shadow
                        useArt // <- set this prop to use non-native shadow on ios
                        style={styles.shadowBtn}>
                        <Image
                          source={require('../../assets/walletOpen.png')}
                          style={{
                            height: moderateScale(40),
                            width: moderateScale(40),
                          }}
                        />
                      </NeomorphFlex>
                      <Text
                        style={[
                          styles.tipBoxTxt,
                          // {marginTop: verticalScale(15)},
                        ]}>
                        Tip Wallet
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => Navigation.navigate('BalanceAndStatement')}
                      style={styles.btnView}>
                      <NeomorphFlex
                        // inner // <- enable inner shadow
                        useArt // <- set this prop to use non-native shadow on ios
                        style={styles.shadowBtn}>
                        <Image
                          source={require('../../assets/history.png')}
                          style={{
                            height: moderateScale(40),
                            width: moderateScale(40),
                          }}
                        />
                      </NeomorphFlex>
                      <Text style={styles.tipBoxTxt}>Balance & Statement</Text>
                    </Pressable>
                  </View>
                </View>
              </LinearGradient>
            </NeomorphFlex>
          </View>
          <View style={styles.bottomView}>
            <Pressable
              onPress={() =>
                Navigation.navigate('ScanQRStack', {name: HomeUser})
              }
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
                  <Text style={styles.loginTxt}>Scan QR Code</Text>
                  <Image
                    source={require('../../assets/qrWhite.png')}
                    style={styles.logoutImage}
                  />
                </LinearGradient>
              </NeomorphFlex>
            </Pressable>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default HomeUser;

const styles = StyleSheet.create({
  bgGradient: {
    // flex: 1,
    height: height + StatusBar.currentHeight,
    width: width,
  },
  topView: {
    marginTop: verticalScale(40),
    paddingHorizontal: moderateScale(30),

    // backgroundColor: 'red',
  },
  headingTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.black,
    alignSelf: 'center',
    fontSize: moderateScale(30),
  },
  settingsTxt: {
    fontFamily: 'Playfair-Display',
    color: COLORS.lovePurple,
    fontSize: moderateScale(20),
    // paddingStart: moderateScale(15),
    marginVertical: verticalScale(30),
    // marginBottom: verticalScale(10),
  },
  centerCard: {
    shadowRadius: 3,
    borderRadius: 25,
    backgroundColor: 'transparent',
    //   width: 150,
    height: verticalScale(361),
    marginTop: verticalScale(40),
  },
  cardGradient: {
    height: '100%',
    width: '100%',
    borderRadius: 25,
  },
  innerCardView: {
    paddingHorizontal: moderateScale(30),
  },
  shadowBtnView: {
    flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    // marginVertical: verticalScale(20),
  },
  shadowBtn: {
    // shadowOffset: {width: 10, height: 10},
    // shadowOpacity: 1,

    // shadowColor: 'grey',
    shadowRadius: 10,
    borderRadius: 20,
    backgroundColor: COLORS.socialBtnColor,
    width: moderateScale(60),
    height: moderateScale(60),
    justifyContent: 'center',
    alignItems: 'center',
    // ...include most of View/Layout styles
  },
  btnIcons: {
    height: moderateScale(300),
    width: moderateScale(300),
  },
  tipBoxTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.tipBlue,
    textAlign: 'center',
    fontSize: moderateScale(10),
    marginTop: verticalScale(10),
  },
  loginBtn: {
    width: '80%',
    alignSelf: 'center',
    borderRadius: moderateScale(40),
    // paddingHorizontal: moderateScale(30),
    height: verticalScale(80),
    marginVertical: verticalScale(30),
  },
  btnGradient: {
    height: '100%',
    justifyContent: 'space-evenly',
    paddingHorizontal: moderateScale(20),
    alignItems: 'center',
    borderRadius: moderateScale(40),
    flexDirection: 'row',
    alignItems: 'center',
  },
  neomorphbtn: {
    shadowRadius: moderateScale(5),
    borderRadius: moderateScale(40),
    backgroundColor: 'transparent',
    borderWidth: 1,
    // backgroundColor: COLORS.white,
    borderColor: COLORS.white,
  },
  loginTxt: {
    fontFamily: 'Playfair-Display',
    color: COLORS.white,
    fontSize: moderateScale(15),
  },
  logoutImage: {
    // marginTop: verticalScale(1),
  },
  btnView: {
    // backgroundColor: 'red',
    // justifyContent: 'center',
    marginTop: 5,
    alignItems: 'center',
    width: moderateScale(70),
    height: verticalScale(120),
    // flex: 1,
  },
  bottomView: {
    paddingHorizontal: moderateScale(34),
    marginVertical: verticalScale(50),
    marginBottom: verticalScale(80),
  },
});
